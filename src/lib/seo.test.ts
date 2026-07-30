import { describe, expect, it } from 'vitest';

import { resolveSiteUrl } from './seo';

describe('seo', () => {
  it('uses the configured production URL and removes trailing slashes', () => {
    expect(resolveSiteUrl('https://fpt-hai-phong.example///', 'http://localhost:5173')).toBe(
      'https://fpt-hai-phong.example'
    );
  });

  it('falls back to the actual runtime origin when no production URL is configured', () => {
    expect(resolveSiteUrl('', 'http://localhost:5173')).toBe('http://localhost:5173');
  });

  it('ignores a malformed configured URL in favor of the safe runtime origin', () => {
    expect(resolveSiteUrl('not-a-url', 'https://landing.example')).toBe('https://landing.example');
  });
});
