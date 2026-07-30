import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { App } from './app';

describe('App', () => {
  it('opens the shared dialog from an area card with the area prefilled', async () => {
    const user = userEvent.setup();

    render(<App />);

    const areaButton = screen.getByRole('button', { name: /Lê Chân/i });
    await user.click(areaButton);

    expect(screen.getByRole('heading', { name: /Nhận tư vấn theo khu vực Hải Phòng/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/Khu vực cần lắp/i)).toHaveValue('Lê Chân');

    await user.click(screen.getByRole('button', { name: /Đóng biểu mẫu/i }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('shows inline validation when the floating lead form is submitted empty', async () => {
    const user = userEvent.setup();

    render(<App />);

    await user.click(screen.getByRole('button', { name: /Mở biểu mẫu để lại thông tin/i }));
    await user.click(screen.getByRole('button', { name: /^Gửi thông tin$/i }));

    expect(screen.getByText(/Vui lòng nhập họ tên/i)).toBeInTheDocument();
    expect(screen.getByText(/Vui lòng nhập số điện thoại/i)).toBeInTheDocument();
    expect(screen.getByText(/Vui lòng chọn khu vực/i)).toBeInTheDocument();
  });

  it('prefills the plan note when opening from a pricing card', async () => {
    const user = userEvent.setup();

    render(<App />);

    const comboSkyCard = screen.getByRole('heading', { name: 'Combo SKY' }).closest('article');
    expect(comboSkyCard).not.toBeNull();

    await user.click(within(comboSkyCard as HTMLElement).getByRole('button', { name: /Chọn gói này/i }));

    expect(screen.getByText(/Đang quan tâm: Combo SKY/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Ghi chú/i)).toHaveValue(
      'Tôi đang quan tâm gói Combo SKY. Nhờ tư vấn giúp theo địa chỉ lắp đặt thực tế.'
    );
  });
});
