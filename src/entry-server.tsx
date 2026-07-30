import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';

import { App } from './app';
export { siteContent } from './data/site-content';
export { buildStructuredData } from './lib/seo';

export function render(): string {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
