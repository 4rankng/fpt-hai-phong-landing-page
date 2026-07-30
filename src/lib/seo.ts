import type { SiteContent } from '../data/site-content';

const JSON_LD_ID = 'local-fpt-hai-phong-jsonld';

export function resolveSiteUrl(configuredUrl?: string, runtimeOrigin?: string): string {
  const browserOrigin = typeof window === 'undefined' ? '' : window.location.origin;
  const candidates = [configuredUrl, runtimeOrigin, browserOrigin];

  for (const candidate of candidates) {
    if (!candidate?.trim()) {
      continue;
    }

    try {
      const parsedUrl = new URL(candidate.trim());

      if (parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:') {
        return parsedUrl.href.replace(/\/+$/, '');
      }
    } catch {
      // Try the next safe runtime-derived candidate.
    }
  }

  return '';
}

export function buildStructuredData(content: SiteContent, siteUrl: string): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${siteUrl}/#service`,
        name: 'Tư vấn lắp mạng FPT Hải Phòng',
        serviceType: 'Tư vấn lắp internet cáp quang và combo giải trí tại Hải Phòng',
        description: content.seo.description,
        areaServed: content.areas.map((area) => area.name),
        availableChannel: [
          {
            '@type': 'ServiceChannel',
            servicePhone: content.contact.phoneDisplay,
            serviceUrl: content.contact.phoneHref
          },
          {
            '@type': 'ServiceChannel',
            serviceUrl: content.contact.zaloHref
          }
        ],
        url: siteUrl
      }
    ]
  };
}

export function applySeo(content: SiteContent): void {
  const siteUrl = resolveSiteUrl(import.meta.env.VITE_SITE_URL);
  const title = content.seo.pageTitle;
  const description = content.seo.description;

  document.title = title;
  upsertMeta('name', 'description', description);
  upsertMeta('name', 'robots', 'index,follow');
  upsertMeta('property', 'og:title', title);
  upsertMeta('property', 'og:description', description);
  upsertMeta('property', 'og:type', 'website');
  upsertMeta('property', 'og:url', siteUrl);
  upsertMeta('property', 'og:image', new URL(content.contact.heroImagePath, `${siteUrl}/`).href);
  upsertMeta('name', 'twitter:card', 'summary_large_image');
  upsertMeta('name', 'theme-color', '#005baa');
  upsertLink('canonical', siteUrl);
  upsertJsonLd(buildStructuredData(content, siteUrl));
}

function upsertMeta(attribute: 'name' | 'property', key: string, content: string): void {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.setAttribute('content', content);
}

function upsertLink(rel: string, href: string): void {
  let element = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);

  if (!element) {
    element = document.createElement('link');
    element.rel = rel;
    document.head.appendChild(element);
  }

  element.href = href;
}

function upsertJsonLd(payload: Record<string, unknown>): void {
  let element = document.getElementById(JSON_LD_ID) as HTMLScriptElement | null;

  if (!element) {
    element = document.createElement('script');
    element.id = JSON_LD_ID;
    element.type = 'application/ld+json';
    document.head.appendChild(element);
  }

  element.textContent = JSON.stringify(payload);
}
