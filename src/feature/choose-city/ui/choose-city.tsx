'use client';

import {
  Badge,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/src/shared/ui';
import { ChooseCityInput } from './choose-city-input';
import { Building, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

const CITIES = [
  { key: 'kyiv', labelKey: 'cities.kyiv' },
  { key: 'dnipro', labelKey: 'cities.dnipro' },
  { key: 'kropyvnytskyi', labelKey: 'cities.kropyvnytskyi' },
  { key: 'odesa', labelKey: 'cities.odesa' },
  { key: 'bilaTserkva', labelKey: 'cities.bilaTserkva' },
  { key: 'lviv', labelKey: 'cities.lviv' },
  { key: 'kharkiv', labelKey: 'cities.kharkiv' },
];

export function ChooseCity() {
  const t = useTranslations('ChooseCity');
  const [selectedCity, setSelectedCity] = useState('odesa');

  return (
    <Dialog>
      <DialogTrigger>
        <div className="flex gap-2 items-center cursor-pointer hover:text-primary-vivid transition-colors">
          <Building className="size-4" /> {t(`cities.${selectedCity}`)}
        </div>
      </DialogTrigger>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>
            <div className="flex items-center justify-between">
              {t('title')}
              <DialogClose className="rounded-lg p-1 hover:bg-accent text-text-muted hover:text-foreground cursor-pointer">
                <X className="size-5" />
              </DialogClose>
            </div>
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-2">
          <div className="flex flex-col border-b border-primary/20 pb-3">
            <ChooseCityInput />
            <div className="mt-2.5">
              <Badge variant="clickable" className="bg-primary-vivid text-primary-foreground font-medium">
                {t(`cities.${selectedCity}`)}
              </Badge>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {CITIES.map((city) => (
              <DialogClose key={city.key} asChild>
                <Badge
                  variant="clickable"
                  onClick={() => setSelectedCity(city.key)}
                  className={selectedCity === city.key ? 'bg-primary-vivid text-primary-foreground font-medium' : ''}
                >
                  {t(city.labelKey)}
                </Badge>
              </DialogClose>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
