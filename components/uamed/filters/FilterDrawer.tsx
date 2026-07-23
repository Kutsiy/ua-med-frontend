import React from 'react';
import { X, SlidersHorizontal, RotateCcw } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import FilterPanel from './FilterPanel';

interface FilterDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  config: any;
  state: Record<string, any>;
  update: (key: string, value: any) => void;
  onClear: () => void;
  resultCount: number;
}

export default function FilterDrawer({
  open,
  onOpenChange,
  config,
  state,
  update,
  onClear,
  resultCount,
}: FilterDrawerProps) {
  const t = useTranslations('Catalog');

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex lg:hidden">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => onOpenChange(false)}
      />

      <div className="relative ml-auto flex h-full w-full max-w-xs flex-col bg-background p-6 shadow-xl transition-transform">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <h2 className="flex items-center gap-2 text-lg font-bold text-foreground">
            <SlidersHorizontal className="size-5 text-primary-vivid" />
            {t('filters')}
          </h2>
          <button
            onClick={() => onOpenChange(false)}
            className="rounded-lg p-1.5 hover:bg-accent text-text-muted hover:text-foreground cursor-pointer"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-6">
          <FilterPanel config={config} state={state} update={update} />
        </div>

        <div className="border-t border-border pt-4 flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={onClear}
            className="flex-1 gap-1.5 border-primary-vivid/35 bg-primary-vivid/15 text-primary-vivid hover:bg-primary-vivid/25 hover:border-primary-vivid/50 cursor-pointer"
          >
            <RotateCcw className="size-3.5" />
            {t('reset')}
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={() => onOpenChange(false)}
            className="flex-1 cursor-pointer"
          >
            {t('showResults', { count: resultCount })}
          </Button>
        </div>
      </div>
    </div>
  );
}
