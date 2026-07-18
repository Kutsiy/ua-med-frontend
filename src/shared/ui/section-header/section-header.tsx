import * as React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/src/shared/configs';
import { cn } from '@/src/shared/libs/utils';

export interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  linkLabel?: string;
  linkHref?: string;
}

export function SectionHeader({
  className,
  title,
  subtitle,
  linkLabel,
  linkHref,
  ...props
}: SectionHeaderProps) {
  return (
    <div className={cn('flex items-end justify-between mb-8', className)} {...props}>
      <div className="space-y-1">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">
          {title}
        </h2>
        {subtitle && (
          <p className="text-sm text-text-muted">
            {subtitle}
          </p>
        )}
      </div>
      {linkLabel && (
        <Link
          href={linkHref || '#'}
          className="inline-flex items-center gap-1 text-sm font-medium text-text-muted hover:text-foreground transition-colors group"
        >
          {linkLabel}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      )}
    </div>
  );
}
