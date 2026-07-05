import { useLocale, useTranslations } from "next-intl";
import { LocalSwitcherSelect } from "../local-switcher-select";
import { locales } from "@/src/shared/config";

export function LocalSwitcher() {
  const t = useTranslations("LocalSwitcher");
  const locale = useLocale();

  return (
    <LocalSwitcherSelect defaultValue={locale}>
      {locales.map((val) => {
        return (
          <option key={val} value={val}>
            {t("locale", { locale: val })}
          </option>
        );
      })}
    </LocalSwitcherSelect>
  );
}
