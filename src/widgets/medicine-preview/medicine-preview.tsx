'use client';

import { Pill, Store } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { SectionHeader } from '@/src/shared/ui';

const medicines = [
  {
    id: 'nurofen',
    price: 89,
    pharmaciesCount: 214,
  },
  {
    id: 'paracetamol',
    price: 24,
    pharmaciesCount: 356,
  },
  {
    id: 'amoxil',
    price: 132,
    pharmaciesCount: 178,
  },
  {
    id: 'vitaminD3',
    price: 215,
    pharmaciesCount: 142,
  },
] as const;

export function MedicinePreview() {
  const t = useTranslations('MedicinePreview');

  return (
    <section id="medicines" className="main-container py-10">
      <SectionHeader
        title={t('title')}
        subtitle={t('subtitle')}
        linkLabel={t('allMedicines')}
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {medicines.map((med) => (
          <article
            key={med.id}
            className="flex flex-col rounded-2xl border border-border bg-card p-4 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="flex size-11 items-center justify-center rounded-xl bg-accent text-foreground">
              <Pill className="size-5" />
            </div>
            
            <h3 className="mt-3 font-semibold text-foreground">
              {t(`medicines.${med.id}.name`)}
            </h3>
            <p className="mt-0.5 text-sm text-text-muted">
              {t(`medicines.${med.id}.form`)}
            </p>

            <div className="mt-4 flex items-end justify-between">
              <div>
                <span className="text-xs text-text-muted">{t('from')}</span>
                <p className="text-lg font-bold text-foreground">
                  {med.price} ₴
                </p>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-success-soft px-2.5 py-1 text-xs font-medium text-success border border-success-border/30">
                <Store className="size-3" />
                {t('pharmacies', { count: med.pharmaciesCount })}
              </span>
            </div>

            <button className="mt-4 inline-flex h-9 w-full items-center justify-center rounded-lg border border-border bg-transparent text-sm font-medium text-foreground transition-all duration-200 hover:bg-primary hover:text-primary-foreground hover:border-primary">
              {t('findInPharmacies')}
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
