import React from 'react';
import { Briefcase, Building2, Clock3, Star } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { DoctorItem } from './doctorData';

interface DoctorResultCardProps {
  item: DoctorItem;
}

export default function DoctorResultCard({ item }: DoctorResultCardProps) {
  const t = useTranslations('Catalog');

  return (
    <article className="flex flex-col justify-between rounded-2xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md">
      <div>
        <div className="flex items-center gap-3">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-accent text-base font-semibold text-foreground">
            {item.initials}
          </span>
          <div className="min-w-0">
            <h3 className="truncate font-semibold text-foreground">{item.name}</h3>
            <p className="text-sm text-text-muted">{item.specialty}</p>
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-1.5 text-sm text-text-muted">
          <span className="inline-flex items-center gap-1.5">
            <Briefcase className="size-4 shrink-0" />
            {item.experience}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Building2 className="size-4 shrink-0" />
            {item.clinic}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Star className="size-4 shrink-0 fill-warning text-warning" />
            <span className="font-medium text-foreground">{item.rating}</span>
            <span>{t('reviewsCount', { count: item.reviews })}</span>
          </span>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between rounded-xl bg-muted/60 px-3 py-2">
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-success">
            <Clock3 className="size-4" />
            {item.time}
          </span>
          <span className="text-sm font-bold text-foreground">{item.price} ₴</span>
        </div>

        <Button
          variant="default"
          size="sm"
          className="mt-4 w-full cursor-pointer"
        >
          {t('book')}
        </Button>
      </div>
    </article>
  );
}
