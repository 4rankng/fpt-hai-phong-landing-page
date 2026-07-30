export type LeadFormValues = {
  name: string;
  phone: string;
  area: string;
  note: string;
};

export type LeadValidationErrors = Partial<Record<keyof LeadFormValues, string>>;

export type LeadTriggerSource = 'hero' | 'plan' | 'area' | 'floating';

export type LeadSubmissionResult =
  | { kind: 'success'; message: string }
  | { kind: 'fallback'; message: string; href: string }
  | { kind: 'error'; message: string; retryable: boolean };

export type SubmitLeadOptions = {
  emailAddress: string;
  endpoint?: string;
  fetchImpl?: typeof fetch;
  redirectToHref?: (href: string) => void;
  timeoutMs?: number;
  submittedFrom: LeadTriggerSource;
  selectedPlan?: string;
};

const DEFAULT_TIMEOUT_MS = 8_000;
const MAX_NAME_LENGTH = 100;
const MAX_NOTE_LENGTH = 500;
const VIETNAMESE_PHONE_PATTERN = /^(0|\+84)(3|5|7|8|9)\d{8}$/;

export function normalizePhone(phone: string): string {
  const trimmedPhone = phone.trim();
  const digits = trimmedPhone.replace(/\D/g, '');

  if (digits.startsWith('0084')) {
    return `+84${digits.slice(4)}`;
  }

  return trimmedPhone.startsWith('+') ? `+${digits}` : digits;
}

export function isValidVietnameseMobilePhone(phone: string): boolean {
  return VIETNAMESE_PHONE_PATTERN.test(normalizePhone(phone));
}

export function validateLeadForm(values: LeadFormValues): LeadValidationErrors {
  const errors: LeadValidationErrors = {};

  if (!values.name.trim()) {
    errors.name = 'Vui lòng nhập họ tên để tiện xưng hô khi gọi lại.';
  } else if (values.name.trim().length > MAX_NAME_LENGTH) {
    errors.name = `Họ tên không được dài quá ${MAX_NAME_LENGTH} ký tự.`;
  }

  if (!values.phone.trim()) {
    errors.phone = 'Vui lòng nhập số điện thoại di động tại Việt Nam.';
  } else if (!isValidVietnameseMobilePhone(values.phone)) {
    errors.phone = 'Số điện thoại chưa đúng định dạng di động Việt Nam.';
  }

  if (!values.area.trim()) {
    errors.area = 'Vui lòng chọn khu vực cần lắp đặt.';
  }

  if (values.note.length > MAX_NOTE_LENGTH) {
    errors.note = `Ghi chú không được dài quá ${MAX_NOTE_LENGTH} ký tự.`;
  }

  return errors;
}

export function buildLeadMailtoHref(
  values: LeadFormValues,
  source: LeadTriggerSource,
  emailAddress: string,
  selectedPlan?: string
): string {
  const subject = encodeURIComponent(`Đăng ký lắp mạng FPT Hải Phòng - ${values.area}`);
  const bodyLines = [
    `Họ tên: ${values.name}`,
    `Số điện thoại: ${normalizePhone(values.phone)}`,
    `Khu vực cần lắp: ${values.area}`,
    `Nguồn gửi: ${source}`,
    selectedPlan ? `Gói đang quan tâm: ${selectedPlan}` : null,
    `Ghi chú: ${values.note || 'Không có'}`
  ].filter(Boolean);
  const body = encodeURIComponent(bodyLines.join('\n'));

  return `mailto:${emailAddress.trim()}?subject=${subject}&body=${body}`;
}

export async function submitLead(
  values: LeadFormValues,
  options: SubmitLeadOptions
): Promise<LeadSubmissionResult> {
  const endpoint = options.endpoint?.trim();
  const redirectToHref = options.redirectToHref ?? ((href: string) => window.location.assign(href));

  if (!endpoint) {
    const href = buildLeadMailtoHref(values, options.submittedFrom, options.emailAddress, options.selectedPlan);
    redirectToHref(href);

    return {
      kind: 'fallback',
      message: 'Đã mở email soạn sẵn. Nếu thiết bị không hỗ trợ email, vui lòng gọi hotline hoặc nhắn Zalo.',
      href
    };
  }

  const fetchImpl = options.fetchImpl ?? fetch;
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), options.timeoutMs ?? DEFAULT_TIMEOUT_MS);

  try {
    const response = await fetchImpl(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      signal: controller.signal,
      body: JSON.stringify({
        ...values,
        phone: normalizePhone(values.phone),
        submittedFrom: options.submittedFrom,
        selectedPlan: options.selectedPlan ?? null,
        submittedAt: new Date().toISOString()
      })
    });

    if (!response.ok) {
      return {
        kind: 'error',
        message: 'Không gửi được thông tin ở lần này. Bạn có thể thử lại hoặc chuyển sang gọi trực tiếp.',
        retryable: true
      };
    }

    return {
      kind: 'success',
      message: 'Thông tin đã được gửi. Đầu mối tư vấn sẽ liên hệ lại sau khi kiểm tra khu vực.'
    };
  } catch (error) {
    const isAbortError = error instanceof DOMException && error.name === 'AbortError';

    return {
      kind: 'error',
      message: isAbortError
        ? 'Yêu cầu đã quá thời gian chờ. Bạn có thể thử lại hoặc gọi trực tiếp để đỡ chậm.'
        : 'Không thể kết nối tới nơi nhận thông tin lúc này. Bạn có thể thử lại hoặc chuyển sang gọi trực tiếp.',
      retryable: true
    };
  } finally {
    window.clearTimeout(timeoutId);
  }
}
