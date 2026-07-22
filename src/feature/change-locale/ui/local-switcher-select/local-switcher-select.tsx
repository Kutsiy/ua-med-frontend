'use client';

import { useRouter, usePathname } from '@/src/shared/configs';
import { Select, SelectTrigger, SelectValue } from '@/src/shared/ui/select';
import { useParams } from 'next/navigation';
import { useTransition } from 'react';

type Props = {
  children: React.ReactNode;
  defaultValue: string;
  label?: string;
};

export function LocalSwitcherSelect({ children, defaultValue, label }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();

  function onSelectChange(nextLocale: string) {
    startTransition(() => {
      // @ts-expect-error not defined param "params"
      router.replace({ pathname, params }, { locale: nextLocale });
    });
  }

  return (
    <label className="w-full flex gap-4 items-center">
      {label && <p>{label}</p>}
      <Select defaultValue={defaultValue} disabled={isPending} onValueChange={onSelectChange}>
        <SelectTrigger className="w-full max-w-48">
          <SelectValue />
        </SelectTrigger>
        {children}
      </Select>
    </label>
  );
}
