import type { ReactNode } from 'react';

interface CardProps {
  title: string;
  description: string;
  icon: ReactNode;
}

export function Card({ title, description, icon }: CardProps) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-soft transition hover:border-slate-300">
      <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
    </article>
  );
}
