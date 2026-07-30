import type { HTMLAttributes, ReactNode } from 'react';

import { cx } from '../../lib/class-names';

type SectionShellProps = {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
  outerClassName?: string;
  innerClassName?: string;
} & HTMLAttributes<HTMLElement>;

export function SectionShell({
  children,
  description,
  eyebrow,
  id,
  innerClassName,
  outerClassName,
  title,
  ...props
}: SectionShellProps) {
  return (
    <section className={cx('section-spacing', outerClassName)} id={id} {...props}>
      <div className={cx('mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 sm:px-6 lg:px-8', innerClassName)}>
        <header className="max-w-3xl space-y-3">
          {eyebrow ? (
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-orange">
              {eyebrow}
            </p>
          ) : null}
          <h2 className="text-pretty text-3xl font-semibold tracking-[-0.03em] text-brand-ink sm:text-4xl">
            {title}
          </h2>
          {description ? <p className="text-base leading-7 text-brand-muted sm:text-lg">{description}</p> : null}
        </header>
        {children}
      </div>
    </section>
  );
}
