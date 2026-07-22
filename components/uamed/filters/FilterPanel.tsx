import React, { useState } from 'react';
import { ChevronDown, Search as SearchIcon, CheckCircle2, Circle } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface FilterPanelProps {
  config: any;
  state: Record<string, any>;
  update: (key: string, value: any) => void;
}

export default function FilterPanel({ config, state, update }: FilterPanelProps) {
  const t = useTranslations('Catalog');
  // Track open accordion sections
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    categoryKey: true,
    availability: true,
    price: true,
    manufacturer: true,
    country: true,
    formKey: true,
    dosage: true,
  });

  // Track search text within filter lists
  const [searchQueries, setSearchQueries] = useState<Record<string, string>>({});

  const toggleSection = (id: string) => {
    setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSearchChange = (id: string, query: string) => {
    setSearchQueries((prev) => ({ ...prev, [id]: query }));
  };

  if (!config.filters) return null;

  return (
    <div className="divide-y divide-border/60">
      {config.filters.map((f: any) => {
        const isOpen = openSections[f.id] ?? true;
        const searchQuery = searchQueries[f.id] || '';

        return (
          <div key={f.id} className="py-4 first:pt-0 last:pb-0">
            {/* Accordion Header */}
            <button
              type="button"
              onClick={() => toggleSection(f.id)}
              className="flex w-full items-center justify-between py-1 text-left font-semibold text-foreground hover:text-primary transition-colors cursor-pointer"
            >
              <span className="text-sm font-semibold text-foreground">{f.label}</span>
              <ChevronDown className={`size-4 text-text-muted transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Accordion Content */}
            {isOpen && (
              <div className="mt-3 space-y-3">
                {/* Searchable input inside filter list */}
                {f.type === 'searchable-select' && (
                  <div className="relative">
                    <SearchIcon className="absolute left-2.5 top-1/2 size-3 -translate-y-1/2 text-text-muted pointer-events-none" />
                    <input
                      type="text"
                      placeholder={t('searchFilterPlaceholder')}
                      value={searchQuery}
                      onChange={(e) => handleSearchChange(f.id, e.target.value)}
                      className="h-7 w-full rounded-lg border border-border bg-card/60 pl-7 pr-2 text-xs text-foreground placeholder:text-text-muted/60 outline-none focus:border-primary transition-colors"
                    />
                  </div>
                )}

                {/* Option list */}
                {(f.type === 'select' || f.type === 'searchable-select') && (
                  <div className="max-h-44 overflow-y-auto pr-1 space-y-0.5 scrollbar-thin scrollbar-thumb-border">
                    {f.options
                      ?.filter((opt: any) =>
                        searchQuery
                          ? opt.label.toLowerCase().includes(searchQuery.toLowerCase())
                          : true
                      )
                      .map((opt: any) => {
                        const active = (state[f.id] || 'all') === opt.value;
                        return (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => update(f.id, opt.value)}
                            className={`flex w-full items-center gap-2 rounded-md px-2 py-1 text-left text-xs transition-colors cursor-pointer ${
                              active
                                ? 'font-medium text-primary bg-primary/10'
                                : 'text-foreground hover:bg-accent/60'
                            }`}
                          >
                            {active ? (
                              <CheckCircle2 className="size-3.5 shrink-0 text-primary" />
                            ) : (
                              <Circle className="size-3.5 shrink-0 text-text-muted/60" />
                            )}
                            <span className="truncate">{opt.label}</span>
                          </button>
                        );
                      })}
                  </div>
                )}

                {/* Range / Slider Filter */}
                {(f.type === 'slider-range' || f.type === 'range') && (
                  <div className="space-y-3 pt-1">
                    <div className="flex items-center justify-between text-sm font-semibold text-foreground">
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
                        className="w-full h-1.5 bg-accent rounded-lg appearance-none cursor-pointer accent-primary"
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
