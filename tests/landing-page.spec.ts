import { expect, test } from '@playwright/test';

const viewports = [
  { width: 320, height: 568 },
  { width: 390, height: 844 },
  { width: 768, height: 1024 },
  { width: 1440, height: 900 }
];

for (const viewport of viewports) {
  test(`landing page remains usable at ${viewport.width}x${viewport.height}`, async ({ page }) => {
    const browserErrors: string[] = [];
    page.on('console', (message) => {
      if (message.type() === 'error') {
        browserErrors.push(message.text());
      }
    });
    page.on('pageerror', (error) => browserErrors.push(error.message));

    await page.setViewportSize(viewport);
    await page.goto('/');

    await expect(page.getByRole('heading', { name: /Lắp mạng FPT Hải Phòng/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Gọi 0931.50.55.56/i })).toHaveAttribute('href', 'tel:0931505556');
    await expect(page.getByRole('link', { name: /Nhắn Zalo 0931.50.55.56/i })).toHaveAttribute('href', 'https://zalo.me/0931505556');

    const areaButton = page.getByRole('button', { name: /Lê Chân/i });
    await areaButton.click();
    await expect(page.getByLabel(/Khu vực cần lắp/i)).toHaveValue('Lê Chân');
    await page.getByRole('button', { name: 'Gửi thông tin', exact: true }).click();
    await expect(page.getByLabel('Họ và tên')).toHaveAttribute('aria-invalid', 'true');
    await expect(page.getByLabel('Họ và tên')).toBeFocused();
    await expect(page.getByText(/đồng ý để đầu mối tư vấn sử dụng họ tên/i)).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog')).toBeHidden();
    await expect(areaButton).toBeFocused();

    await page.locator('#site-footer').scrollIntoViewIfNeeded();
    await expect(page.getByRole('button', { name: 'Mở biểu mẫu để lại thông tin' })).toBeHidden();

    const overflowCheck = await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth);
    expect(overflowCheck).toBe(true);
    expect(browserErrors).toEqual([]);
  });
}

test('serves the main landing content in static HTML before JavaScript runs', async ({ request }) => {
  const response = await request.get('/');
  const html = await response.text();

  expect(response.ok()).toBe(true);
  expect(html).toContain('Lắp mạng FPT Hải Phòng');
  expect(html).toContain('Tải xuống tới 1 Gbps');
  expect(html).toContain('<div id="root"><');
  expect(html).not.toContain('Trang Nguyễn');
});
