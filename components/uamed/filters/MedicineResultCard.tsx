import React from 'react';
import { Pill, Store, Star } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { MedicineItem } from './medicineData';

interface MedicineResultCardProps {
  item: MedicineItem;
}

export default function MedicineResultCard({ item }: MedicineResultCardProps) {
  const t = useTranslations('Catalog');

  return (
    <article className="flex flex-col justify-between rounded-2xl border border-border bg-card p-4 shadow-sm transition-all hover:shadow-md">
      <div>
        <div className="flex items-center justify-between">
          <div className="flex size-11 items-center justify-center rounded-xl bg-accent text-foreground">
            <Pill className="size-5" />
          </div>
          <span className="flex items-center gap-1 text-sm font-semibold text-foreground">
            <Star className="size-4 fill-warning text-warning" />
            {item.rating}
            <span className="text-xs font-normal text-text-muted">({item.reviews})</span>
          </span>
        </div>

        <h3 className="mt-4 font-semibold text-foreground">{item.name}</h3>
        <p className="mt-0.5 text-sm text-text-muted">{item.form}</p>
      </div>

      <div className="mt-6">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-xs text-text-muted">{t('priceFrom')}</span>
            <p className="text-lg font-bold text-foreground">{item.price} ₴</p>
          </div>
          {item.inStock ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-success-soft px-2.5 py-1 text-xs font-medium text-success border border-success-border/30">
              <Store className="size-3" />
              {t('pharmaciesCount', { count: item.pharmaciesCount })}
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 rounded-full bg-accent/50 px-2.5 py-1 text-xs font-medium text-text-muted border border-border">
              {t('outOfStock')}
            </span>
          )}
        </div>

        <Button
          variant="default"
          size="sm"
          disabled={!item.inStock}
          className="mt-4 w-full cursor-pointer"
        >
          {t('findInPharmacies')}
        </Button>
      </div>
    </article>
  );
}
