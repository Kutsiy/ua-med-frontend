import { getTranslations } from "next-intl/server";
import style from "./header.module.css";
import { LocalSwitcher } from "@/src/shared/ui/local-switcher/local-switcher";
import { User } from "lucide-react";
import { Logo, ShoppingCart } from "@/src/shared/ui";

export async function Header() {
  const t = await getTranslations("Header");

  return (
    <header className={`${style.header} main-container`}>
      <Logo>Ua Med</Logo>
      <nav className="flex-1 flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <div>
            <div>{t("catalog")}</div>
            <div></div>
          </div>
          <div>
            <div className="*:cursor-pointer ">
              <LocalSwitcher />
            </div>
          </div>
        </div>

        <div className="flex gap-4 items-center">
          <div>Одесса</div>

          <div className="cursor-pointer">
            <ShoppingCart amount={0} />
          </div>

          <div className="flex justify-center items-center bg-primary rounded-2xl px-2 py-1.5 cursor-pointer flex gap-2 items-center">
            <User /> <span className="text-xl">Увійти</span>
          </div>
        </div>
      </nav>
    </header>
  );
}
