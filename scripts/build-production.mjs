import { spawn } from 'node:child_process';

const configuredSiteUrl = process.argv[2]?.trim();

if (!configuredSiteUrl) {
  console.error('Thiếu URL thật. Chạy: npm run build:production -- https://ten-mien-cua-ban.vn');
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
    const productionEnv = { ...process.env, VITE_SITE_URL: siteUrl };
    await run('node', ['scripts/generate-sitemap.mjs', siteUrl], productionEnv);
    await run('npm', ['run', 'build'], productionEnv);
    console.log(`Đã tạo gói production hoàn chỉnh trong dist/ cho ${siteUrl}`);
  }
}

function run(command, args, env) {
  return new Promise((resolveRun, rejectRun) => {
    const child = spawn(command, args, { env, stdio: 'inherit' });

    child.on('error', rejectRun);
    child.on('exit', (exitCode) => {
      if (exitCode === 0) {
        resolveRun();
      } else {
        rejectRun(new Error(`${command} thoát với mã ${exitCode ?? 'không xác định'}`));
      }
    });
  });
}
