import { MessageChatCircle, ShieldTick } from '@untitledui/icons';

import type { SiteContent } from '../../data/site-content';
import { SectionShell } from '../ui/section-shell';

const icons = [ShieldTick, MessageChatCircle];

type ProofSectionProps = {
  content: SiteContent;
};

export function ProofSection({ content }: ProofSectionProps) {
  return (
    <SectionShell
      description={content.proofIntro}
      eyebrow="Quy trình"
      title={content.proofHeading}
      outerClassName="bg-brand-shell"
    >
      <div className="grid gap-5 lg:grid-cols-2">
        {content.proofPanels.map((panel, index) => {
          const Icon = icons[index] ?? ShieldTick;

          return (
            <article className="flex min-h-64 flex-col rounded-[2rem] border border-brand-ink/10 bg-white p-6 sm:p-8" key={panel.title}>
              <div className="mb-8 flex size-12 items-center justify-center rounded-2xl bg-brand-blue text-white">
                <Icon className="size-6" />
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold tracking-[-0.03em] text-brand-ink">{panel.title}</h3>
                <p className="text-base leading-7 text-brand-muted">{panel.description}</p>
              </div>
              <p className="mt-auto pt-6 text-sm font-medium text-brand-orange">{panel.caption}</p>
            </article>
          );
        })}
      </div>
    </SectionShell>
  );
}
