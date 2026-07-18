'use client';

import { CalendarCheck, ClipboardCheck, Scale, Search } from 'lucide-react';
import { useTranslations } from 'next-intl';

const steps = [
  {
    id: 'find',
    icon: Search,
  },
  {
    id: 'compare',
    icon: Scale,
  },
  {
    id: 'book',
    icon: CalendarCheck,
  },
  {
    id: 'receive',
    icon: ClipboardCheck,
  },
] as const;

export function HowItWorks() {
  const t = useTranslations('HowItWorks');

  return (
    <section id="how" className="bg-accent/30 py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-pretty text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {t('title')}
          </h2>
          <p className="mt-2 text-text-muted">
            {t('subtitle')}
          </p>
        </div>

        <ol className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <li
                key={step.id}
                className="relative rounded-2xl border border-border bg-card p-5 shadow-sm"
              >
                <span className="absolute right-4 top-4 text-3xl font-bold text-text-muted/15 select-none">
                  {i + 1}
                </span>
                <div className="flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <Icon className="size-5" />
                </div>
                <h3 className="mt-4 font-semibold text-foreground">
                  {t(`steps.${step.id}.title`)}
                </h3>
                <p className="mt-1 text-sm text-text-muted">
                  {t(`steps.${step.id}.text`)}
                </p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
