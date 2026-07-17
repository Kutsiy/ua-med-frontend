'use client';
import { useTranslations } from 'next-intl';

import { Button } from '@/src/shared';
import { User } from 'lucide-react';
import { useState } from 'react';

export function AuthButtons() {
  const t = useTranslations('Header');
  const [isAuth, setAuth] = useState(false);

  return (
    <div className="lg:flex items-center gap-2 hidden">
      {!isAuth ? (
        <>
          <Button>
            <User />
            {t('login')}
          </Button>

          <Button variant="ghost">{t('register')}</Button>
        </>
      ) : (
        <Button>
          <User /> {t('city')}
        </Button>
      )}
    </div>
  );
}
