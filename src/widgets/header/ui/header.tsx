import { getTranslations } from "next-intl/server";
import style from "./header.module.css";
import { LocalSwitcher, ChooseCity } from "@/src/feature";
import { User } from "lucide-react";
import { Button, Logo, ShoppingCart } from "@/src/shared/ui";

export async function Header() {
  const t = await getTranslations("Header");

  return (
    <header className={`${style.header} main-container`}>
      <Logo>Ua Med</Logo>
      <nav className="h-full flex-1 flex justify-between items-center">
        <div className="h-10 flex gap-4 items-center">
          <div>
            <Button>{t("catalog")}</Button>
            <div></div>
          </div>
          <div>
            <div className="*:cursor-pointer ">
              <LocalSwitcher />
            </div>
          </div>
        </div>

        <div className="h-10 flex gap-4 items-center">
          <ChooseCity />

          <div className="cursor-pointer">
            <ShoppingCart amount={0} />
          </div>

          <div className="flex items-center gap-2">
            <Button>
              <User />
              Увійти
            </Button>

            <Button variant="ghost">Зареєструватись</Button>
          </div>
        </div>
      </nav>
    </header>
  );
}
