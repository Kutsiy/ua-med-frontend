'use client';

import { Button } from '@/src/shared';
import { User } from 'lucide-react';
import { useState } from 'react';

export function AuthButtons() {
  const [isAuth, setAuth] = useState(false);

  return (
    <div className="lg:flex items-center gap-2 hidden">
      {!isAuth ? (
        <>
          <Button>
            <User />
            Увійти
          </Button>

          <Button variant="outline">Зареєструватись</Button>
        </>
      ) : (
        <Button>
          <User /> Нік
        </Button>
      )}
    </div>
  );
}
