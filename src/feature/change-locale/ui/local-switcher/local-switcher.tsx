import { useLocale, useTranslations } from 'next-intl';
import { LocalSwitcherSelect } from '../local-switcher-select';
import { locales } from '@/src/shared/configs';
import { SelectContent, SelectGroup, SelectItem } from '@/src/shared/ui/select';

export function LocalSwitcher({ label }: { label?: string }) {
  const t = useTranslations('LocalSwitcher');
  const locale = useLocale();

  return (
    <LocalSwitcherSelect defaultValue={locale} label={label}>
      <SelectContent>
        <SelectGroup>
          {locales.map((val) => {
            return (
              <SelectItem key={val} value={val}>
                {t('locale', { locale: val })}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </LocalSwitcherSelect>
  );
}
