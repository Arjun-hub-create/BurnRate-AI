import type { ButtonHTMLAttributes } from 'react';
import { clsx } from '../../utils/classNames';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
}

const variantStyles: Record<'primary' | 'secondary' | 'ghost', string> = {
  primary: 'bg-brand-600 text-white shadow-soft hover:bg-brand-700 focus-visible:ring-brand-400',
  secondary:
    'border border-slate-300 bg-white text-slate-900 hover:border-slate-400 hover:bg-slate-50 focus-visible:ring-brand-400',
  ghost: 'text-slate-700 hover:text-slate-900 focus-visible:ring-brand-400',
};

export function Button({ className, variant = 'primary', ...props }: ButtonProps) {
  return (
    <button
      className={clsx(
        'inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white',
        variantStyles[variant],
        className
      )}
      {...props}
    />
  );
}
