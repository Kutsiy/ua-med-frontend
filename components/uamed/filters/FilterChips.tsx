import React from 'react';
import { X, RotateCcw } from 'lucide-react';
import { useTranslations } from 'next-intl';

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
      <button
        type="button"
        onClick={onClear}
        className="inline-flex items-center gap-1.5 rounded-full border border-primary-vivid/35 bg-primary-vivid/15 px-3 py-1 text-xs font-semibold text-primary-vivid hover:bg-primary-vivid/25 hover:border-primary-vivid/50 transition-all cursor-pointer shadow-xs"
      >
        <RotateCcw className="size-3" />
        {t('resetAll')}
      </button>
    </div>
  );
}
