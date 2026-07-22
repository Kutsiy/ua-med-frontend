import React from 'react';
import { X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';

interface FilterChipsProps {
  config: any;
  state: Record<string, any>;
  update: (key: string, value: any) => void;
  onClear: () => void;
}

export default function FilterChips({ config, state, update, onClear }: FilterChipsProps) {
  const t = useTranslations('Catalog');
  const chips: { key: string; label: string; onRemove: () => void }[] = [];

  if (state.q) {
    chips.push({
      key: 'q',
      label: t('searchQueryLabel', { query: state.q }),
      onRemove: () => update('q', ''),
    });
  }

  if (config.filters) {
    config.filters.forEach((f: any) => {
      if (f.type === 'select' || f.type === 'searchable-select') {
        const val = state[f.id];
        if (val && val !== 'all') {
          const option = f.options?.find((o: any) => o.value === val);
          chips.push({
            key: f.id,
            label: `${f.label}: ${option ? option.label : val}`,
            onRemove: () => update(f.id, 'all'),
          });
        }
      } else if (f.type === 'range' || f.type === 'slider-range') {
        const min = state[f.minKey];
        const max = state[f.maxKey];
        if (min || max) {
          let label = `${f.label}: `;
          if (min && max) label += `${min} - ${max}`;
          else if (min) label += `${t('fromText')} ${min}`;
          else if (max) label += `${t('toText')} ${max}`;

          chips.push({
            key: f.id,
            label,
            onRemove: () => {
              update(f.minKey, '');
              update(f.maxKey, '');
            },
          });
        }
      } else if (f.type === 'boolean' && state[f.key] === true) {
        chips.push({
          key: f.key,
          label: f.label,
          onRemove: () => update(f.key, false),
        });
      }
    });
  }

  if (chips.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs text-text-muted">{t('activeFilters')}</span>
      {chips.map((chip) => (
        <span
          key={chip.key}
          className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-foreground"
        >
          {chip.label}
          <button
            onClick={chip.onRemove}
            className="rounded-full p-0.5 hover:bg-accent text-text-muted hover:text-foreground cursor-pointer"
          >
            <X className="size-3" />
          </button>
        </span>
      ))}
      <Button
        variant="ghost"
        size="xs"
        onClick={onClear}
        className="text-xs text-primary hover:text-primary/80 cursor-pointer"
      >
        {t('resetAll')}
      </Button>
    </div>
  );
}
