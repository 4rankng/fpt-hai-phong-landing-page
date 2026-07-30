import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';

import { cx } from '../../lib/class-names';

type SharedProps = {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'accent';
  fullWidth?: boolean;
  className?: string;
};

type AnchorProps = SharedProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

type ButtonProps = SharedProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

function getVariantClassName(variant: SharedProps['variant']): string {
  switch (variant) {
    case 'secondary':
      return 'bg-white text-brand-ink border border-brand-ink/14 hover:border-brand-blue/40 hover:text-brand-blue';
    case 'ghost':
      return 'bg-transparent text-brand-ink border border-brand-ink/12 hover:border-brand-ink/28';
    case 'accent':
      return 'bg-brand-green text-white hover:bg-brand-green-dark';
    case 'primary':
    default:
      return 'bg-brand-blue text-white hover:bg-brand-blue-dark';
  }
}

function getBaseClassName(fullWidth?: boolean, className?: string, variant?: SharedProps['variant']): string {
  return cx(
    'inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold tracking-[0.01em] transition-colors disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus-visible:ring-offset-white',
    getVariantClassName(variant),
    fullWidth && 'w-full',
    className
  );
}

export function ButtonLink({ children, className, fullWidth, href, variant = 'primary', ...props }: AnchorProps) {
  return (
    <a className={getBaseClassName(fullWidth, className, variant)} href={href} {...props}>
      {children}
    </a>
  );
}

export function ButtonAction({ children, className, fullWidth, type = 'button', variant = 'primary', ...props }: ButtonProps) {
  return (
    <button className={getBaseClassName(fullWidth, className, variant)} type={type} {...props}>
      {children}
    </button>
  );
}
