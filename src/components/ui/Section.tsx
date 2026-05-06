import type { ReactNode } from 'react';

interface SectionProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export function Section({ title, subtitle, children }: SectionProps) {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-16 sm:px-8 lg:px-10">
      <div className="max-w-2xl">
        <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          {title}
        </h2>
        {subtitle ? <p className="mt-4 text-base leading-7 text-slate-600">{subtitle}</p> : null}
      </div>
      <div className="mt-12">{children}</div>
    </section>
  );
}
