"use client";

import { useRouter, usePathname } from "@/src/shared/config";
import { useParams } from "next/navigation";
import { ChangeEvent, useTransition } from "react";

type Props = {
  children: React.ReactNode;
  defaultValue: string;
  label: string;
};

export function LocalSwitcherSelect({ children, defaultValue, label }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();

  function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value;
    startTransition(() => {
      // @ts-expect-error not defined param "params"
      router.replace({ pathname, params }, { locale: nextLocale });
    });
  }

  return (
    <label>
      <p>{label}</p>
      <select
        defaultValue={defaultValue}
        disabled={isPending}
        onChange={onSelectChange}
      >
        {children}
      </select>
    </label>
  );
}
