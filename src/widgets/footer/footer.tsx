'use client';

import { Mail, MapPin, Phone } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Logo } from '@/src/shared/ui';
import { Link } from '@/src/shared/configs';

const colKeys = ['services', 'company', 'help'] as const;

export function Footer() {
  const t = useTranslations('Footer');

  return (
    <footer className="border-t border-border bg-footer text-footer-foreground">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-5">
          <div className="col-span-2">
            <Link href="/">
              <Logo>Ua Med</Logo>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-footer-foreground">
              {t('description')}
            </p>
          </div>

          {colKeys.map((colKey) => (
            <div key={colKey}>
              <h3 className="text-sm font-semibold text-foreground">
                {t(`columns.${colKey}.title`)}
              </h3>
              <ul className="mt-3 space-y-2">
                {(t.raw(`columns.${colKey}.links`) as string[]).map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-footer-foreground transition-colors hover:text-primary"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-border pt-6 text-sm text-footer-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>{t('rights', { year: new Date().getFullYear() })}</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <a
              href={`tel:${t('phone').replace(/\s/g, '')}`}
              className="inline-flex items-center gap-1.5 hover:text-primary transition-colors"
            >
              <Phone className="size-4 text-primary" />
              {t('phone')}
            </a>
            <a
              href={`mailto:${t('email')}`}
              className="inline-flex items-center gap-1.5 hover:text-primary transition-colors"
            >
              <Mail className="size-4 text-primary" />
              {t('email')}
            </a>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="size-4 text-primary" />
              {t('location')}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
