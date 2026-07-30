import { describe, expect, it, vi } from 'vitest';

import {
  buildLeadMailtoHref,
  isValidVietnameseMobilePhone,
  submitLead,
  validateLeadForm
} from './lead-submit';

describe('lead-submit', () => {
  it('validates required fields and Vietnamese mobile format', () => {
    expect(validateLeadForm({ area: '', name: '', note: '', phone: '' })).toEqual({
      area: 'Vui lòng chọn khu vực cần lắp đặt.',
      name: 'Vui lòng nhập họ tên để tiện xưng hô khi gọi lại.',
      phone: 'Vui lòng nhập số điện thoại di động tại Việt Nam.'
    });

    expect(isValidVietnameseMobilePhone('0931 505 556')).toBe(true);
    expect(isValidVietnameseMobilePhone('(0931) 505 556')).toBe(true);
    expect(isValidVietnameseMobilePhone('0084 931 505 556')).toBe(true);
    expect(isValidVietnameseMobilePhone('0123 456 789')).toBe(false);

    expect(validateLeadForm({
      area: 'Lê Chân',
      name: 'A'.repeat(101),
      note: 'B'.repeat(501),
      phone: '0931505556'
    })).toEqual({
      name: 'Họ tên không được dài quá 100 ký tự.',
      note: 'Ghi chú không được dài quá 500 ký tự.'
    });
  });

  it('builds a prefilled mailto fallback', async () => {
    const redirectToHref = vi.fn();
    const result = await submitLead(
      {
        name: 'Nguyen Van A',
        phone: '0931 505 556',
        area: 'Lê Chân',
        note: 'Nhà trong ngõ'
      },
      {
        emailAddress: 'tu-van@example.vn',
        redirectToHref,
        selectedPlan: 'Combo SKY',
        submittedFrom: 'plan'
      }
    );

    expect(result.kind).toBe('fallback');
    expect(redirectToHref).toHaveBeenCalledTimes(1);
    expect(buildLeadMailtoHref(
      {
        name: 'Nguyen Van A',
        phone: '0931 505 556',
        area: 'Lê Chân',
        note: 'Nhà trong ngõ'
      },
      'plan',
      'tu-van@example.vn',
      'Combo SKY'
    )).toContain('mailto:tu-van@example.vn');
  });

  it('posts JSON to the configured endpoint and returns success', async () => {
    const fetchImpl = vi.fn().mockResolvedValue({
      ok: true
    });

    const result = await submitLead(
      {
        name: 'Nguyen Van B',
        phone: '0931505556',
        area: 'Ngô Quyền',
        note: ''
      },
      {
        emailAddress: 'tu-van@example.vn',
        endpoint: 'https://example.com/lead',
        fetchImpl,
        selectedPlan: 'SKY',
        submittedFrom: 'plan'
      }
    );

    expect(result).toEqual({
      kind: 'success',
      message: 'Thông tin đã được gửi. Đầu mối tư vấn sẽ liên hệ lại sau khi kiểm tra khu vực.'
    });
    expect(fetchImpl).toHaveBeenCalledTimes(1);
  });

  it('returns a retryable error when the endpoint rejects', async () => {
    const fetchImpl = vi.fn().mockRejectedValue(new Error('network'));

    const result = await submitLead(
      {
        name: 'Nguyen Van C',
        phone: '0931505556',
        area: 'Hải An',
        note: ''
      },
      {
        emailAddress: 'tu-van@example.vn',
        endpoint: 'https://example.com/lead',
        fetchImpl,
        submittedFrom: 'floating'
      }
    );

    expect(result).toEqual({
      kind: 'error',
      message: 'Không thể kết nối tới nơi nhận thông tin lúc này. Bạn có thể thử lại hoặc chuyển sang gọi trực tiếp.',
      retryable: true
    });
  });
});
