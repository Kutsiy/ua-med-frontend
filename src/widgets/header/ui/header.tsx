import { getTranslations } from "next-intl/server";
import style from "./header.module.css";
import { LocalSwitcher } from "@/src/shared/ui/local-switcher/local-switcher";

export async function Header() {
  const t = await getTranslations("Header");

  return (
    <header className={`${style.header} main-gap`}>
      <div className="text-3xl font-bold">Ua Med</div>
      <nav className="flex gap-4 items-center">
        <div>
          <div>{t("catalog")}</div>
          <div></div>
        </div>
        <div>
          <div className="w-[700px] *:cursor-pointer ">
            <LocalSwitcher />
          </div>
        </div>
      </nav>
    </header>
  );
}
