import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import { createServer, loadEnv } from 'vite';

const projectRoot = process.cwd();
const outputPath = resolve(projectRoot, 'dist/index.html');
const viteServer = await createServer({
  appType: 'custom',
  logLevel: 'error',
  root: projectRoot,
  server: { hmr: false, middlewareMode: true }
});

try {
  const {
    buildStructuredData,
    render,
    siteContent
  } = await viteServer.ssrLoadModule('/src/entry-server.tsx');
  const template = await readFile(outputPath, 'utf8');
  const renderedApp = render();
  let output = template.replace('<div id="root"></div>', `<div id="root">${renderedApp}</div>`);

  const productionEnv = loadEnv('production', projectRoot, '');
  const configuredSiteUrl = process.env.VITE_SITE_URL?.trim() || productionEnv.VITE_SITE_URL?.trim();
  const siteUrl = resolvePublicOrigin(configuredSiteUrl);

  if (siteUrl) {
    const heroImageUrl = new URL(siteContent.contact.heroImagePath, `${siteUrl}/`).href;
    const structuredData = JSON.stringify(buildStructuredData(siteContent, siteUrl)).replace(/</g, '\\u003c');
    const staticSeo = [
      `<meta property="og:url" content="${siteUrl}" />`,
      `<link rel="canonical" href="${siteUrl}" />`,
      `<script id="local-fpt-hai-phong-jsonld" type="application/ld+json">${structuredData}</script>`
    ].join('\n    ');

    output = output
      .replace(
        /<meta property="og:image" content="[^"]*" \/>/,
        `<meta property="og:image" content="${heroImageUrl}" />`
      )
      .replace('</head>', `    ${staticSeo}\n  </head>`);
  }

  await writeFile(outputPath, output, 'utf8');
  console.log(`Prerendered landing page HTML${siteUrl ? ` for ${siteUrl}` : ' using runtime-origin SEO fallback'}.`);
} finally {
  await viteServer.close();
}

function resolvePublicOrigin(configuredUrl) {
  if (!configuredUrl) {
    return '';
  }

  try {
    const parsedUrl = new URL(configuredUrl);
    return ['http:', 'https:'].includes(parsedUrl.protocol) ? parsedUrl.origin : '';
  } catch {
    return '';
  }
}
