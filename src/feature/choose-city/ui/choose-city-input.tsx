'use client';

import { InputGroup, InputGroupAddon, InputGroupInput } from '@/src/shared/ui/input-group';
import { X, SearchIcon } from 'lucide-react';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

export function ChooseCityInput() {
  const t = useTranslations('ChooseCity');
  const [value, setValue] = useState('');

  return (
    <InputGroup>
      <InputGroupInput
        onInput={(e: any) => setValue(e.target?.value || '')}
        value={value}
        placeholder={t('placeholder')}
      />
      <InputGroupAddon>
        <SearchIcon />
      </InputGroupAddon>
      <InputGroupAddon align="inline-end">
        <X className="cursor-pointer" onClick={() => setValue('')} />
      </InputGroupAddon>
    </InputGroup>
  );
}
