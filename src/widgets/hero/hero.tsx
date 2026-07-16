'use client';

import { useState } from 'react';
import { Pill, Store, Stethoscope, Building2, Syringe } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Badge } from '@/src/shared/ui';
import { Search } from '@/src/shared/ui/search/search';

export function Hero() {
  const t = useTranslations('Hero');
  const [activeTab, setActiveTab] = useState('medicines');

  const badges = [
    {
      id: 'medicines',
      label: t('badgeMedicines'),
      icon: <Pill size={24} />,
    },
    {
      id: 'pharmacies',
      label: t('badgePharmacies'),
      icon: <Store size={24} />,
    },
    {
      id: 'doctors',
      label: t('badgeDoctors'),
      icon: <Stethoscope size={24} />,
    },
    {
      id: 'clinics',
      label: t('badgeClinics'),
      icon: <Building2 size={24} />,
    },
    {
      id: 'services',
      label: t('badgeServices'),
      icon: <Syringe size={24} />,
    },
  ];

  return (
    <section className="relative w-full min-h-[450px] bg-secondary/30 flex flex-col items-center justify-center">
      <div className="pointer-events-none absolute h-[500px] top-[-350px] w-full bg-radial from-primary/85 to-primary/20 rounded-full z-1 blur-2xl"></div>
      <div className="main-container flex flex-col gap-4 items-center justify-center z-10">
        <div className="px-2 p-1.5 rounded-lg bg-background text-foreground text-sm font-medium border border-border">
          {t('stats')}
        </div>
        <div className="text-5xl font-bold text-foreground">
          {t('title')}
        </div>
        <div className="text-lg text-text-muted">
          {t('subtitle')}
        </div>
        <div className="flex flex-wrap gap-2 justify-center">
          {badges.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <Badge
                key={item.id}
                variant={isActive ? 'default' : 'darker'}
                className={`${isActive ? 'bg-foreground text-background hover:bg-foreground/90 border-transparent' : ''} [&>svg]:size-4!`}
                onClick={() => setActiveTab(item.id)}
              >
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
