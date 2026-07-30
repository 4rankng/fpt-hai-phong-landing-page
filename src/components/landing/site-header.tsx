import { PhoneCall01 } from '@untitledui/icons';

import type { ContactDetails } from '../../data/site-content';
import { ButtonLink } from '../ui/button-link';

type SiteHeaderProps = {
  contact: ContactDetails;
};

export function SiteHeader({ contact }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-brand-ink/8 bg-white/92 backdrop-blur">
      <div className="mx-auto flex min-h-18 max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center">
          <img
            alt="FPT Telecom"
            className="h-10 w-auto object-contain"
            height={40}
            loading="eager"
            src={contact.logoPath}
            width={138}
          />
        </div>
        <ButtonLink aria-label={`Gọi hotline ${contact.phoneDisplay}`} href={contact.phoneHref}>
          <PhoneCall01 className="size-5" />
          <span>{contact.phoneDisplay}</span>
        </ButtonLink>
      </div>
    </header>
  );
}
