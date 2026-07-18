'use client';

import { Clock, MapPin, Navigation, Star } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button, SectionHeader } from '@/src/shared/ui';

const pharmacies = [
  {
    id: 'health',
    open: true,
    rating: 4.8,
  },
  {
    id: 'wishHealth',
    open: true,
    rating: 4.6,
  },
  {
    id: 'goodDay',
    open: false,
    rating: 4.7,
  },
] as const;

export function NearbyPharmacies() {
  const t = useTranslations('NearbyPharmacies');

  return (
    <section id="pharmacies" className="bg-muted/30 py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          title={t('title')}
          subtitle={t('subtitle')}
          linkLabel={t('allPharmacies')}
        />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {pharmacies.map((p) => (
            <article
              key={p.id}
              className="flex flex-col rounded-2xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-semibold text-foreground">
                  {t(`pharmaciesList.${p.id}.name`)}
                </h3>
                <span className="inline-flex items-center gap-1 rounded-md bg-warning-soft px-2 py-0.5 text-xs font-medium text-warning border border-warning-border/20">
                  <Star className="size-3 fill-current text-warning" />
                  {p.rating}
                </span>
              </div>

              <p className="mt-2 flex items-center gap-1.5 text-sm text-text-muted">
                <MapPin className="size-4 shrink-0 text-text-muted" />
                {t(`pharmaciesList.${p.id}.address`)}
              </p>

              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm">
                <span
                  className={`inline-flex items-center gap-1.5 font-medium ${
                    p.open ? 'text-success' : 'text-danger'
                  }`}
                >
                  <span
                    className={`size-2 rounded-full ${
                      p.open ? 'bg-success' : 'bg-danger'
                    }`}
                  />
                  {p.open ? t('open') : t('closed')}
                </span>
                <span className="inline-flex items-center gap-1.5 text-text-muted">
                  <Clock className="size-4" />
                  {t(`pharmaciesList.${p.id}.hours`)}
                </span>
                <span className="inline-flex items-center gap-1.5 text-text-muted">
                  <Navigation className="size-4" />
                  {t(`pharmaciesList.${p.id}.distance`)}
                </span>
              </div>

              <Button
                variant="default"
                size="sm"
                className="mt-4 w-full cursor-pointer"
              >
                {t('view')}
              </Button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
