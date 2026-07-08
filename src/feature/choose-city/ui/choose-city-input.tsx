'use client';

import { InputGroup, InputGroupAddon, InputGroupInput } from '@/src/shared/ui/input-group';
import { X, SearchIcon } from 'lucide-react';
import { useState } from 'react';

export function ChooseCityInput() {
  const [value, setValue] = useState('');

  return (
    <InputGroup>
      <InputGroupInput
        onInput={(value) => setValue(value.data)}
        value={value}
        placeholder="Вкажіть назву міста/населеного пункту"
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
