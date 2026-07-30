import { ArrowRight, Monitor01, Tv02, Wifi } from '@untitledui/icons';

import type { Plan, SiteContent } from '../../data/site-content';
import { ButtonAction } from '../ui/button-link';
import { SectionShell } from '../ui/section-shell';
import type { LeadRequest } from './hero-section';

const categoryMeta: Record<Plan['category'], { icon: typeof Wifi; label: string }> = {
  internet: { icon: Wifi, label: 'Internet' },
  combo: { icon: Tv02, label: 'Combo' },
  game: { icon: Monitor01, label: 'Game' }
};

type PlanSectionProps = {
  content: SiteContent;
  onOpenLead: (request: LeadRequest) => void;
};

export function PlanSection({ content, onOpenLead }: PlanSectionProps) {
  return (
    <SectionShell
      description={content.plansIntro}
      eyebrow="Gói cước"
      id="goi-cuoc"
      title={content.plansHeading}
    >
      <div className="grid gap-5 lg:grid-cols-3">
        {content.plans.map((plan) => {
          const meta = categoryMeta[plan.category];
          const Icon = meta.icon;

          return (
            <article
              className="relative flex min-h-[25rem] flex-col rounded-[2rem] border border-brand-ink/10 bg-white p-6 shadow-soft"
              key={plan.id}
            >
              {plan.isPopular ? (
                <span className="absolute right-6 top-6 inline-flex items-center rounded-full bg-brand-orange px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-white">
                  Phổ biến
                </span>
              ) : null}
              <div className="mb-6 flex items-center gap-3">
                <div className="flex size-12 items-center justify-center rounded-2xl bg-brand-shell text-brand-blue">
                  <Icon className="size-6" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-muted">{meta.label}</p>
                  <h3 className="text-2xl font-semibold tracking-[-0.03em] text-brand-ink">{plan.name}</h3>
                </div>
              </div>

              <p className="text-3xl font-semibold tracking-[-0.03em] text-brand-ink">{plan.priceLabel}</p>
              <p className="mt-3 text-base leading-7 text-brand-muted">{plan.summary}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {plan.specs.map((spec) => (
                  <span
                    className="rounded-full bg-brand-blue/7 px-3 py-1.5 text-xs font-semibold text-brand-blue"
                    key={spec}
                  >
                    {spec}
                  </span>
                ))}
              </div>
              <ul className="mt-5 space-y-3 text-sm leading-6 text-brand-muted">
                {plan.bullets.map((bullet) => (
                  <li className="flex gap-3" key={bullet}>
                    <span aria-hidden="true" className="mt-2 size-2 rounded-full bg-brand-green" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              <ButtonAction
                className="mt-auto"
                fullWidth
                onClick={() =>
                  onOpenLead({
                    source: 'plan',
                    planName: plan.name,
                    note: `Tôi đang quan tâm gói ${plan.name}. Nhờ tư vấn giúp theo địa chỉ lắp đặt thực tế.`,
                    triggerLabel: `Tư vấn gói ${plan.name}`
                  })
                }
                variant={plan.isPopular ? 'primary' : 'secondary'}
              >
                <span>Chọn gói này</span>
                <ArrowRight className="size-5" />
              </ButtonAction>
            </article>
          );
        })}
      </div>
      <p className="text-sm leading-6 text-brand-muted">{content.disclaimer}</p>
    </SectionShell>
  );
}
