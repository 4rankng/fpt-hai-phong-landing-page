import { AlertCircle, CheckCircle, Mail01, PhoneCall01, RefreshCcw01, XClose } from '@untitledui/icons';
import { useId, useState, type FormEvent, type InputHTMLAttributes } from 'react';
import {
  Button,
  Dialog,
  Heading,
  Modal,
  ModalOverlay
} from 'react-aria-components';

import type { Area } from '../../data/site-content';
import { cx } from '../../lib/class-names';
import {
  buildLeadMailtoHref,
  submitLead,
  type LeadFormValues,
  type LeadSubmissionResult,
  type LeadValidationErrors,
  validateLeadForm
} from '../../lib/lead-submit';
import { ButtonAction, ButtonLink } from '../ui/button-link';
import type { LeadRequest } from './hero-section';

type LeadFormDialogProps = {
  areas: Area[];
  contactPhoneHref: string;
  contactPhoneDisplay: string;
  emailAddress: string;
  endpoint?: string;
  isOpen: boolean;
  request: LeadRequest | null;
  onOpenChange: (open: boolean) => void;
};

type SubmissionState = {
  status: 'idle' | 'submitting' | 'resolved';
  result: LeadSubmissionResult | null;
};

export function LeadFormDialog({
  areas,
  contactPhoneDisplay,
  contactPhoneHref,
  emailAddress,
  endpoint,
  isOpen,
  onOpenChange,
  request
}: LeadFormDialogProps) {
  const titleId = useId();
  const descriptionId = useId();
  const initialValues: LeadFormValues = {
    name: '',
    phone: '',
    area: request?.area ?? '',
    note: request?.note ?? ''
  };
  const formKey = request ? `${request.source}-${request.area ?? ''}-${request.planName ?? ''}-${request.note ?? ''}` : 'closed';

  return (
    <ModalOverlay
      className="react-aria-ModalOverlay fixed inset-0 z-50 bg-brand-ink/55 p-0 backdrop-blur-sm"
      isDismissable
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <Modal className="fixed inset-x-0 bottom-0 top-auto max-h-dvh overflow-y-auto overscroll-contain outline-none sm:inset-0 sm:flex sm:items-center sm:justify-center sm:p-6">
        <Dialog
          aria-describedby={descriptionId}
          aria-labelledby={titleId}
          className="max-h-[calc(100dvh-0.5rem)] w-full overflow-y-auto rounded-t-[2rem] bg-white p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] shadow-soft outline-none sm:max-h-[calc(100dvh-3rem)] sm:max-w-2xl sm:rounded-[2rem] sm:p-8"
        >
          {({ close }) => (
            <>
              <div className="mb-6 flex items-start justify-between gap-4">
                <div className="space-y-2">
                  <Heading className="text-2xl font-semibold tracking-[-0.03em] text-brand-ink" id={titleId} slot="title">
                    Nhận tư vấn theo khu vực Hải Phòng
                  </Heading>
                  <p className="text-sm leading-6 text-brand-muted" id={descriptionId}>
                    Biểu mẫu này điền sẵn theo lựa chọn của bạn. Nếu chưa dùng email hoặc endpoint tạm thời không nhận được dữ liệu,
                    hotline và Zalo vẫn là kênh dự phòng chính.
                  </p>
                </div>
                <Button
                  aria-label="Đóng biểu mẫu"
                  className="flex size-11 items-center justify-center rounded-full border border-brand-ink/10 text-brand-muted transition-colors hover:border-brand-ink/20 hover:text-brand-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2"
                  onPress={close}
                >
                  <XClose className="size-5" />
                </Button>
              </div>

              {request ? (
                <div className="mb-6 rounded-[1.5rem] border border-brand-ink/10 bg-brand-shell px-4 py-3 text-sm leading-6 text-brand-muted">
                  <p className="font-semibold text-brand-ink">{request.triggerLabel}</p>
                  {request.planName ? <p>Đang quan tâm: {request.planName}</p> : null}
                  {request.area ? <p>Khu vực đã chọn: {request.area}</p> : null}
                </div>
              ) : null}

              <LeadDialogFormContent
                key={formKey}
                areas={areas}
                contactPhoneDisplay={contactPhoneDisplay}
                contactPhoneHref={contactPhoneHref}
                emailAddress={emailAddress}
                endpoint={endpoint}
                initialValues={initialValues}
                request={request}
                onClose={close}
              />
            </>
          )}
        </Dialog>
      </Modal>
    </ModalOverlay>
  );
}

type FieldProps = {
  autoComplete?: string;
  error?: string;
  inputMode?: InputHTMLAttributes<HTMLInputElement>['inputMode'];
  label: string;
  maxLength?: number;
  name: string;
  onChange: (value: string) => void;
  placeholder: string;
  value: string;
};

function Field({ autoComplete, error, inputMode, label, maxLength, name, onChange, placeholder, value }: FieldProps) {
  const id = `lead-${name}`;

  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-brand-ink" htmlFor={id}>
        {label}
      </label>
      <input
        aria-describedby={error ? `${id}-error` : undefined}
        aria-invalid={Boolean(error)}
        autoComplete={autoComplete}
        className={getFieldClassName(Boolean(error))}
        id={id}
        inputMode={inputMode}
        maxLength={maxLength}
        name={name}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        value={value}
      />
      {error ? (
        <p className="text-sm text-brand-danger" id={`${id}-error`} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function getFieldClassName(hasError: boolean): string {
  return cx(
    'min-h-12 w-full rounded-[1.2rem] border bg-white px-4 py-3 text-base text-brand-ink outline-none transition-colors placeholder:text-brand-muted focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20',
    hasError ? 'border-brand-danger/50' : 'border-brand-ink/12'
  );
}

type LeadDialogFormContentProps = {
  areas: Area[];
  contactPhoneDisplay: string;
  contactPhoneHref: string;
  emailAddress: string;
  endpoint?: string;
  initialValues: LeadFormValues;
  onClose: () => void;
  request: LeadRequest | null;
};

function LeadDialogFormContent({
  areas,
  contactPhoneDisplay,
  contactPhoneHref,
  emailAddress,
  endpoint,
  initialValues,
  onClose,
  request
}: LeadDialogFormContentProps) {
  const [values, setValues] = useState<LeadFormValues>(initialValues);
  const [errors, setErrors] = useState<LeadValidationErrors>({});
  const [submissionState, setSubmissionState] = useState<SubmissionState>({ status: 'idle', result: null });

  const canRetry = submissionState.result?.kind === 'error' && submissionState.result.retryable;
  const resolvedResult = submissionState.status === 'resolved' ? submissionState.result : null;
  const fallbackMailtoHref = buildLeadMailtoHref(
    values,
    request?.source ?? 'floating',
    emailAddress,
    request?.planName
  );

  const handleFieldChange = <FieldName extends keyof LeadFormValues>(field: FieldName, nextValue: LeadFormValues[FieldName]) => {
    setValues((currentValues) => ({ ...currentValues, [field]: nextValue }));
    setErrors((currentErrors) => {
      const nextErrors = { ...currentErrors };
      delete nextErrors[field];
      return nextErrors;
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateLeadForm(values);

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      const firstInvalidField = Object.keys(nextErrors)[0];
      window.requestAnimationFrame(() => document.getElementById(`lead-${firstInvalidField}`)?.focus());
      return;
    }

    setSubmissionState({ status: 'submitting', result: null });

    const result = await submitLead(values, {
      emailAddress,
      endpoint,
      selectedPlan: request?.planName,
      submittedFrom: request?.source ?? 'floating'
    });

    setSubmissionState({ status: 'resolved', result });
  };

  if (resolvedResult && resolvedResult.kind !== 'error') {
    return (
      <div className="space-y-4">
        <div
          aria-live="polite"
          className={cx(
            'rounded-[1.5rem] border px-4 py-4 text-sm leading-6',
            resolvedResult.kind === 'success'
              ? 'border-brand-green/30 bg-brand-green/10 text-brand-ink'
              : 'border-brand-blue/25 bg-brand-blue/8 text-brand-ink'
          )}
        >
          <div className="flex items-start gap-3">
            {resolvedResult.kind === 'success' ? (
              <CheckCircle className="mt-0.5 size-5 shrink-0 text-brand-green-dark" />
            ) : (
              <Mail01 className="mt-0.5 size-5 shrink-0 text-brand-blue" />
            )}
            <div>
              <p className="font-semibold text-brand-ink">{resolvedResult.message}</p>
              {resolvedResult.kind === 'fallback' ? (
                <p className="mt-2 break-all text-brand-muted">{resolvedResult.href}</p>
              ) : null}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink fullWidth href={contactPhoneHref}>
            <PhoneCall01 className="size-5" />
            <span>Gọi {contactPhoneDisplay}</span>
          </ButtonLink>
          <ButtonAction fullWidth onClick={onClose} variant="secondary">
            Đóng biểu mẫu
          </ButtonAction>
        </div>
      </div>
    );
  }

  return (
    <form className="space-y-4" noValidate onSubmit={handleSubmit}>
      <Field
        autoComplete="name"
        error={errors.name}
        label="Họ và tên"
        maxLength={100}
        name="name"
        onChange={(nextValue) => handleFieldChange('name', nextValue)}
        placeholder="Nhập họ tên người cần được liên hệ"
        value={values.name}
      />
      <Field
        autoComplete="tel"
        error={errors.phone}
        inputMode="tel"
        label="Số điện thoại"
        maxLength={30}
        name="phone"
        onChange={(nextValue) => handleFieldChange('phone', nextValue)}
        placeholder="Ví dụ 0931 505 556"
        value={values.phone}
      />
      <div className="space-y-2">
        <label className="text-sm font-semibold text-brand-ink" htmlFor="lead-area">
          Khu vực cần lắp
        </label>
        <select
          aria-describedby={errors.area ? 'lead-area-error' : undefined}
          aria-invalid={Boolean(errors.area)}
          className={getFieldClassName(Boolean(errors.area))}
          id="lead-area"
          name="area"
          onChange={(event) => handleFieldChange('area', event.target.value)}
          value={values.area}
        >
          <option value="">Chọn khu vực cần lắp đặt</option>
          {areas.map((area) => (
            <option key={area.id} value={area.name}>
              {area.name}
            </option>
          ))}
        </select>
        {errors.area ? (
          <p className="text-sm text-brand-danger" id="lead-area-error" role="alert">
            {errors.area}
          </p>
        ) : null}
      </div>
      <div className="space-y-2">
        <label className="text-sm font-semibold text-brand-ink" htmlFor="lead-note">
          Ghi chú
        </label>
        <textarea
          aria-describedby={errors.note ? 'lead-note-error' : undefined}
          aria-invalid={Boolean(errors.note)}
          className={getFieldClassName(Boolean(errors.note))}
          id="lead-note"
          maxLength={500}
          name="note"
          onChange={(event) => handleFieldChange('note', event.target.value)}
          placeholder="Ví dụ: nhà trong ngõ, cần gọi sau 18h, đang quan tâm combo."
          rows={4}
          value={values.note}
        />
        {errors.note ? (
          <p className="text-sm text-brand-danger" id="lead-note-error" role="alert">
            {errors.note}
          </p>
        ) : null}
      </div>

      {submissionState.result?.kind === 'error' ? (
        <div
          className="rounded-[1.5rem] border border-brand-danger/25 bg-brand-danger/10 px-4 py-3 text-sm leading-6 text-brand-ink"
          role="alert"
        >
          <div className="flex items-start gap-3">
            <AlertCircle className="mt-0.5 size-5 shrink-0 text-brand-danger" />
            <div>
              <p className="font-semibold text-brand-ink">{submissionState.result.message}</p>
              <p className="mt-1 text-brand-muted">
                Bạn có thể thử lại hoặc chuyển sang email{' '}
                <a className="underline" href={fallbackMailtoHref}>{emailAddress}</a>.
              </p>
            </div>
          </div>
        </div>
      ) : null}

      <p className="rounded-2xl bg-brand-shell px-4 py-3 text-xs leading-5 text-brand-muted">
        Bằng việc bấm “Gửi thông tin”, bạn đồng ý để đầu mối tư vấn sử dụng họ tên, số điện thoại, khu vực và ghi chú
        chỉ nhằm kiểm tra hạ tầng, tư vấn gói và liên hệ lại về nhu cầu lắp mạng này.
      </p>

      <div className="flex flex-col gap-3 sm:flex-row">
        <ButtonAction disabled={submissionState.status === 'submitting'} fullWidth type="submit">
          {submissionState.status === 'submitting' ? 'Đang gửi thông tin...' : canRetry ? 'Thử gửi lại' : 'Gửi thông tin'}
        </ButtonAction>
        <ButtonLink fullWidth href={contactPhoneHref} variant="secondary">
          Gọi trực tiếp
        </ButtonLink>
        <ButtonLink fullWidth href={fallbackMailtoHref} variant="ghost">
          {canRetry ? <RefreshCcw01 className="size-5" /> : <Mail01 className="size-5" />}
          <span>Mở email</span>
        </ButtonLink>
      </div>
    </form>
  );
}
