import { writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const configuredSiteUrl = process.env.VITE_SITE_URL?.trim() || process.argv[2]?.trim();

if (!configuredSiteUrl) {
  console.error('Thiếu URL thật. Chạy: npm run seo:generate -- https://ten-mien-cua-ban.vn');
  process.exitCode = 1;
} else {
  let siteUrl;

  try {
    const parsedUrl = new URL(configuredSiteUrl);

    if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
      throw new Error('unsupported protocol');
    }

    siteUrl = parsedUrl.origin;
  } catch {
    console.error('URL phải là địa chỉ tuyệt đối bắt đầu bằng http:// hoặc https://.');
    process.exitCode = 1;
  }

  if (siteUrl) {
    const publicDirectory = resolve('public');
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}/</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
</urlset>
`;
    const robots = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;

    await Promise.all([
      writeFile(resolve(publicDirectory, 'sitemap.xml'), sitemap, 'utf8'),
      writeFile(resolve(publicDirectory, 'robots.txt'), robots, 'utf8')
    ]);

    console.log(`Đã tạo robots.txt và sitemap.xml cho ${siteUrl}`);
  }
}
