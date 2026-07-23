import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search as SearchIcon, CheckCircle2, Circle } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface FilterPanelProps {
  config: any;
  state: Record<string, any>;
  update: (key: string, value: any) => void;
}

const INITIAL_VISIBLE_COUNT = 5;

export default function FilterPanel({ config, state, update }: FilterPanelProps) {
  const t = useTranslations('Catalog');

  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    categoryKey: true,
    availability: true,
    price: true,
    manufacturer: false,
    country: false,
    formKey: false,
    dosage: false,
  });

  const [searchQueries, setSearchQueries] = useState<Record<string, string>>({});
  const [expandedLists, setExpandedLists] = useState<Record<string, boolean>>({});

  const toggleSection = (id: string) => {
    setOpenSections((prev) => ({ ...prev, [id]: !(prev[id] ?? false) }));
  };

  const handleSearchChange = (id: string, query: string) => {
    setSearchQueries((prev) => ({ ...prev, [id]: query }));
  };

  const toggleExpandList = (id: string) => {
    setExpandedLists((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  if (!config.filters) return null;

  return (
    <div className="divide-y divide-border/50">
      {config.filters.map((f: any) => {
        const isOpen = openSections[f.id] ?? false;
        const searchQuery = searchQueries[f.id] || '';
        const isListExpanded = expandedLists[f.id] || false;

        const isSelectActive = (f.type === 'select' || f.type === 'searchable-select') && state[f.id] && state[f.id] !== 'all';
        const isRangeActive = (f.type === 'slider-range' || f.type === 'range') && (state[f.minKey] || state[f.maxKey]);
        const hasActiveFilter = isSelectActive || isRangeActive;

        const filteredOptions = f.options?.filter((opt: any) =>
          searchQuery ? opt.label.toLowerCase().includes(searchQuery.toLowerCase()) : true
        ) || [];

        const hasMoreOptions = filteredOptions.length > INITIAL_VISIBLE_COUNT;
        const visibleOptions = (isListExpanded || searchQuery)
          ? filteredOptions
          : filteredOptions.slice(0, INITIAL_VISIBLE_COUNT);

        return (
          <div key={f.id} className="py-3 first:pt-0 last:pb-0">
            <button
              type="button"
              onClick={() => toggleSection(f.id)}
              className="flex w-full items-center justify-between py-1 text-left group cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-foreground/80 group-hover:text-primary-vivid transition-colors">
                  {f.label}
                </span>
                {hasActiveFilter && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary-vivid/15 px-1.5 py-0.5 text-[10px] font-semibold text-primary-vivid">
                    <span className="size-1.5 rounded-full bg-primary-vivid" />
                  </span>
                )}
              </div>
              <ChevronDown className={`size-4 text-text-muted transition-transform duration-200 ${isOpen ? 'rotate-180 text-primary-vivid' : ''}`} />
            </button>

            {isOpen && (
              <div className="mt-2.5 space-y-2.5">
                {f.type === 'searchable-select' && (
                  <div className="relative">
                    <SearchIcon className="absolute left-2.5 top-1/2 size-3 -translate-y-1/2 text-text-muted pointer-events-none" />
                    <input
                      type="text"
                      placeholder={t('searchFilterPlaceholder')}
                      value={searchQuery}
                      onChange={(e) => handleSearchChange(f.id, e.target.value)}
                      className="h-7 w-full rounded-md border border-border bg-card/60 pl-7 pr-2 text-xs text-foreground placeholder:text-text-muted/60 outline-none focus:border-primary-vivid transition-colors"
                    />
                  </div>
                )}

                {(f.type === 'select' || f.type === 'searchable-select') && (
                  <div className="space-y-0.5">
                    {visibleOptions.map((opt: any) => {
                      const active = (state[f.id] || 'all') === opt.value;
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => update(f.id, opt.value)}
                          className={`flex w-full items-center gap-2 rounded-lg px-2 py-1 text-left text-xs transition-colors cursor-pointer ${
                            active
                              ? 'font-semibold text-primary-vivid bg-primary-vivid/15'
                              : 'text-foreground hover:bg-accent/60'
                          }`}
                        >
                          {active ? (
                            <CheckCircle2 className="size-3.5 shrink-0 text-primary-vivid" />
                          ) : (
                            <Circle className="size-3.5 shrink-0 text-text-muted/60" />
                          )}
                          <span className="truncate">{opt.label}</span>
                        </button>
                      );
                    })}

                    {hasMoreOptions && !searchQuery && (
                      <button
                        type="button"
                        onClick={() => toggleExpandList(f.id)}
                        className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 text-[11px] font-semibold text-primary-vivid hover:underline cursor-pointer"
                      >
                        {isListExpanded ? (
                          <>
                            <ChevronUp className="size-3" />
                            {t('showLess')}
                          </>
                        ) : (
                          <>
                            <ChevronDown className="size-3" />
                            {t('showMore', { count: filteredOptions.length - INITIAL_VISIBLE_COUNT })}
                          </>
                        )}
                      </button>
                    )}
                  </div>
                )}

                {(f.type === 'slider-range' || f.type === 'range') && (
                  <div className="space-y-2.5 pt-0.5">
                    <div className="flex items-center justify-between text-xs font-bold text-foreground">
                      <span>{state[f.minKey] || f.min || 0} ₴</span>
                      <span className="text-text-muted">—</span>
                      <span>{state[f.maxKey] || f.max || 1000} ₴</span>
                    </div>

                    <div className="relative pt-1">
                      <input
                        type="range"
                        min={f.min || 0}
                        max={f.max || 1000}
                        value={state[f.maxKey] || f.max || 1000}
                        onChange={(e) => update(f.maxKey, e.target.value)}
                        className="w-full h-1.5 bg-accent rounded-lg appearance-none cursor-pointer accent-primary-vivid"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
