import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/src/shared/configs';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  crumbs?: { label: string; href?: string }[];
}

export default function PageHeader({ title, subtitle, crumbs }: PageHeaderProps) {
  const t = useTranslations('Catalog');

  return (
    <div className="relative border-b border-border bg-secondary/30 py-8">
      <div className="pointer-events-none absolute h-[500px] top-[-350px] w-full bg-radial from-primary/85 to-primary/20 rounded-full z-0 blur-2xl"></div>
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {crumbs && crumbs.length > 0 && (
          <div className="mb-4 inline-flex">
            <nav className="inline-flex items-center gap-1.5 text-xs text-text-muted bg-card/60 border border-border/60 backdrop-blur-sm rounded-full px-3 py-1.5">
              <Link href="/" className="flex items-center gap-1 hover:text-foreground transition-colors">
                <Home className="size-3.5" />
                {t('crumbs.home')}
              </Link>
              {crumbs.map((crumb, idx) => (
                <React.Fragment key={idx}>
                  <ChevronRight className="size-3 text-text-muted/60" />
                  {crumb.href ? (
                    <Link href={crumb.href} className="hover:text-foreground transition-colors">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-foreground font-medium">{crumb.label}</span>
                  )}
                </React.Fragment>
              ))}
            </nav>
          </div>
        )}
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-1 text-sm text-text-muted">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
