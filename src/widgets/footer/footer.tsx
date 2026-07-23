'use client';

import { Mail, MapPin, Phone } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { Logo } from '@/src/shared/ui';
import { Link } from '@/src/shared/configs';

const colKeys = ['services', 'company', 'help'] as const;

function getLinkHref(linkName: string): string {
  const nameLower = linkName.toLowerCase();
  if (nameLower.includes('ліків') || nameLower.includes('medicine')) {
    return '/catalog?tab=medicines';
  }
  if (nameLower.includes('лікарі') || nameLower.includes('doctor') || nameLower.includes('клініки') || nameLower.includes('clinic')) {
    return '/catalog?tab=doctors';
  }
  if (nameLower.includes('про') || nameLower.includes('about')) {
    return '/about';
  }
  if (nameLower.includes('як це працює') || nameLower.includes('how it works')) {
    return '/#how-it-works';
  }
  return '/catalog';
}

export function Footer() {
  const t = useTranslations('Footer');
  const pathname = usePathname();

  const isHomePage = /^\/(uk|en)?\/?$/.test(pathname || '');

  if (!isHomePage) {
    return (
      <footer className="border-t border-border bg-footer/90 text-footer-foreground py-4">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 sm:flex-row sm:px-6">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Logo>Ua Med</Logo>
            </Link>
            <span className="text-xs text-footer-foreground/60 border-l border-border/80 pl-3">
              {t('rights', { year: new Date().getFullYear() })}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs text-footer-foreground">
            <a
              href={`tel:${t('phone').replace(/\s/g, '')}`}
              className="inline-flex items-center gap-1.5 hover:text-primary-vivid transition-colors"
            >
              <Phone className="size-3.5 text-primary-vivid" />
              {t('phone')}
            </a>
            <a
              href={`mailto:${t('email')}`}
              className="inline-flex items-center gap-1.5 hover:text-primary-vivid transition-colors"
            >
              <Mail className="size-3.5 text-primary-vivid" />
              {t('email')}
            </a>
            <span className="hidden sm:inline-flex items-center gap-1.5 text-footer-foreground/80">
              <MapPin className="size-3.5 text-primary-vivid" />
              {t('location')}
            </span>
          </div>
        </div>
      </footer>
    );
  }

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
                    <Link
                      href={getLinkHref(link)}
                      className="text-sm text-footer-foreground transition-colors hover:text-primary-vivid"
                    >
                      {link}
                    </Link>
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
              className="inline-flex items-center gap-1.5 hover:text-primary-vivid transition-colors"
            >
              <Phone className="size-4 text-primary-vivid" />
              {t('phone')}
            </a>
            <a
              href={`mailto:${t('email')}`}
              className="inline-flex items-center gap-1.5 hover:text-primary-vivid transition-colors"
            >
              <Mail className="size-4 text-primary-vivid" />
              {t('email')}
            </a>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="size-4 text-primary-vivid" />
              {t('location')}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
