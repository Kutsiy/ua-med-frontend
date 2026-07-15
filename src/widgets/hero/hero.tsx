'use client';

import { Pill, Store } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Badge } from '@/src/shared/ui';
import { Search } from '@/src/shared/ui/search/search';

export function Hero() {
  const t = useTranslations('Hero');
  const badges = [
  {
    label: t('badgeMedicines'),
    icon: <Pill size={16} />,
  },
  {
    label: t('badgePharmacies'),
    icon: <Store size={16} />,
  },
];

  return (
    <section className="relation w-full min-h-[450px] bg-secondary/30 flex flex-col items-center justify-center">
      <div className="absolute h-[500px] top-[-350px] w-full bg-radial from-primary/85 to-primary/20 rounded-full z-1 blur-2xl"></div>
      <div className="main-container flex flex-col gap-4 items-center justify-center z-10">
        <div className="px-2 p-1.5 rounded-lg bg-background">
          {t('stats')}
        </div>
        <div className="text-5xl font-bold">
          {t('title')}
        </div>
        <div className="text-lg text-text-muted">
          {t('subtitle')}
        </div>
        <div className="flex gap-2">
          {badges.map((item) => {
            return (
              <Badge key={item.label} variant="darker">
                {item.icon}
                {item.label}
              </Badge>
            );
          })}
        </div>
        <Search />
      </div>
    </section>
  );
}
