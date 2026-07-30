import type { SiteContent } from '../../data/site-content';
import { SectionShell } from '../ui/section-shell';

type FaqSectionProps = {
  content: SiteContent;
};

export function FaqSection({ content }: FaqSectionProps) {
  return (
    <SectionShell eyebrow="Giải đáp" id="cau-hoi-thuong-gap" title={content.faqHeading}>
      <div className="grid gap-4">
        {content.faqs.map((item) => (
          <details className="group rounded-[1.75rem] border border-brand-ink/10 bg-white px-5 py-4" key={item.question}>
            <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 text-left text-lg font-semibold text-brand-ink marker:hidden">
              <span>{item.question}</span>
              <span
                aria-hidden="true"
                className="flex size-8 items-center justify-center rounded-full border border-brand-ink/10 text-brand-muted transition-transform group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="pt-4 text-base leading-7 text-brand-muted">{item.answer}</p>
          </details>
        ))}
      </div>
    </SectionShell>
  );
}
