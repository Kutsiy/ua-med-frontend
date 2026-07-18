'use client';

import { Briefcase, Building2, Clock3, Star } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button, SectionHeader } from '@/src/shared/ui';

const doctors = [
  {
    id: 'olena',
    rating: 4.9,
    reviews: 328,
    time: '14:30',
    price: 650,
  },
  {
    id: 'andriy',
    rating: 4.8,
    reviews: 254,
    time: '16:00',
    price: 900,
  },
  {
    id: 'iryna',
    rating: 5.0,
    reviews: 412,
    time: '17:15',
    price: 500,
  },
] as const;

export function DoctorsToday() {
  const t = useTranslations('DoctorsToday');

  return (
    <section id="doctors" className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <SectionHeader
        title={t('title')}
        subtitle={t('subtitle')}
        linkLabel={t('allDoctors')}
      />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {doctors.map((d) => (
          <article
            key={d.id}
            className="flex flex-col rounded-2xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="flex items-center gap-3">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-accent text-base font-semibold text-foreground">
                {t(`doctorsList.${d.id}.initials`)}
              </span>
              <div className="min-w-0">
                <h3 className="truncate font-semibold text-foreground">
                  {t(`doctorsList.${d.id}.name`)}
                </h3>
                <p className="text-sm text-text-muted">
                  {t(`doctorsList.${d.id}.specialty`)}
                </p>
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-1.5 text-sm text-text-muted">
              <span className="inline-flex items-center gap-1.5">
                <Briefcase className="size-4 shrink-0" />
                {t(`doctorsList.${d.id}.experience`)}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Building2 className="size-4 shrink-0" />
                {t(`doctorsList.${d.id}.clinic`)}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Star className="size-4 shrink-0 fill-warning text-warning" />
                <span className="font-medium text-foreground">{d.rating}</span>
                <span>{t('reviews', { count: d.reviews })}</span>
              </span>
            </div>

            <div className="mt-4 flex items-center justify-between rounded-xl bg-muted/60 px-3 py-2">
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-success">
                <Clock3 className="size-4" />
                {t('todayAt', { time: d.time })}
              </span>
              <span className="text-sm font-bold text-foreground">
                {d.price} ₴
              </span>
            </div>

            <Button
              variant="default"
              size="sm"
              className="mt-4 w-full cursor-pointer"
            >
              {t('book')}
            </Button>
          </article>
        ))}
      </div>
    </section>
  );
}
