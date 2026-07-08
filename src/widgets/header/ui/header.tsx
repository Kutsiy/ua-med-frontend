import { getTranslations } from 'next-intl/server';
import style from './header.module.css';
import { LocalSwitcher, ChooseCity, AuthButtons } from '@/src/feature';
import { Button, Logo, ShoppingCart } from '@/src/shared/ui';
import { ChevronDown, ClipboardList } from 'lucide-react';

export async function Header() {
  const t = await getTranslations('Header');

  return (
    <div className={`${style.header}`}>
      <header className="main-container h-full flex items-center gap-6 py-1">
        <Logo>Ua Med</Logo>
        <nav className="h-full flex-1 flex justify-between items-center">
          <div className="h-10 flex gap-4 items-center">
            <div className="flex gap-2 items-center">
              <Button>
                <ClipboardList /> {t('catalog')}
              </Button>
              <Button>
                <ChevronDown /> Services
              </Button>
            </div>
            <div>
              <div className="*:cursor-pointer ">
                <LocalSwitcher />
              </div>
            </div>
          </div>

          <div className="h-10 flex gap-4 items-center">
            <ChooseCity />
            <div className="cursor-pointer hidden lg:block">
              <ShoppingCart amount={0} />
            </div>
            <AuthButtons />
          </div>
        </nav>
      </header>
    </div>
  );
}
