import { getTranslations } from "next-intl/server";
import style from "./header.module.css";

export async function Header() {
  const t = await getTranslations("Header");

  return (
    <header className={`${style.header} main-gap`}>
      <div className="text-3xl font-bold">Ua Med</div>
      <nav>
        <div>
          <div>{t("catalog")}</div>
          <div></div>
        </div>
        <div></div>
      </nav>
    </header>
  );
}
