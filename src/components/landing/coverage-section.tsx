import { ArrowRight, Map01 } from '@untitledui/icons';

import type { SiteContent } from '../../data/site-content';
import { cx } from '../../lib/class-names';
import { SectionShell } from '../ui/section-shell';
import type { LeadRequest } from './hero-section';

type CoverageSectionProps = {
  content: SiteContent;
  onOpenLead: (request: LeadRequest) => void;
};

export function CoverageSection({ content, onOpenLead }: CoverageSectionProps) {
  return (
    <SectionShell
      description={content.coverageIntro}
      eyebrow="Khu vực"
      id="khu-vuc"
      title={content.coverageHeading}
      outerClassName="bg-brand-shell"
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {content.areas.map((area) => (
          <button
            className={cx(
              'flex min-h-44 w-full flex-col rounded-[2rem] border p-5 text-left transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus-visible:ring-offset-brand-shell',
              area.accentClassName
            )}
            key={area.id}
            onClick={() =>
              onOpenLead({
                source: 'area',
                area: area.name,
                note: `Tôi cần kiểm tra khả năng lắp đặt tại khu vực ${area.name}.`,
                triggerLabel: `Kiểm tra khu vực ${area.name}`
              })
            }
            type="button"
          >
            <div className="mb-5 flex items-center justify-between gap-3">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-white/80 text-current">
                <Map01 className="size-6" />
              </div>
              <ArrowRight className="size-5 shrink-0" />
            </div>
            <h3 className="text-2xl font-semibold tracking-[-0.03em]">{area.name}</h3>
            <p className="mt-3 text-sm leading-6 text-current/80">{area.note}</p>
          </button>
        ))}
      </div>
    </SectionShell>
  );
}
