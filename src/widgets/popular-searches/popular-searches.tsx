'use client';

import { TrendingUp } from 'lucide-react';
import { useTranslations } from 'next-intl';

const chipKeys = [
  'nurofen',
  'paracetamol',
  'familyDoctor',
  'dentist',
  'cardiologist',
  'tests',
  'vitaminD',
  'ultrasound',
] as const;

export function PopularSearches() {
  const t = useTranslations('PopularSearches');

  return (
    <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <div className="flex shrink-0 items-center gap-2 text-sm font-semibold text-foreground">
          <TrendingUp className="size-4 text-primary" />
          {t('title')}
        </div>
        <div className="flex flex-wrap gap-2 justify-center">
          {chipKeys.map((key) => (
            <button
              key={key}
              type="button"
              className="rounded-full border border-border bg-card px-3.5 py-1.5 text-sm text-foreground transition-colors hover:border-primary/50 hover:bg-accent hover:text-accent-foreground cursor-pointer"
            >
              {t(`chips.${key}`)}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
