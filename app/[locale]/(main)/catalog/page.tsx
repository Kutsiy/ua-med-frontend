'use client';

import React, { useMemo, useState, useEffect } from "react";
import { Search, SlidersHorizontal, X, Inbox, Pill, Stethoscope } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import PageHeader from "@/components/uamed/PageHeader";
import FilterPanel from "@/components/uamed/filters/FilterPanel";
import FilterChips from "@/components/uamed/filters/FilterChips";
import SortSelect from "@/components/uamed/filters/SortSelect";
import FilterDrawer from "@/components/uamed/filters/FilterDrawer";
import MedicineResultCard from "@/components/uamed/filters/MedicineResultCard";
import DoctorResultCard from "@/components/uamed/filters/DoctorResultCard";
import { useUrlFilters, buildDefaults, buildSchema } from "@/components/uamed/filters/useUrlFilters";
import { applyFilters, countActive } from "@/components/uamed/filters/applyFilters";
import { MEDICINE_CONFIG, MEDICINES, getMedicineConfig, getMedicines } from "@/components/uamed/filters/medicineData";
import { DOCTOR_CONFIG, DOCTORS, getDoctorConfig, getDoctors } from "@/components/uamed/filters/doctorData";

const DEFAULTS = { tab: "medicines", ...buildDefaults(MEDICINE_CONFIG), ...buildDefaults(DOCTOR_CONFIG) };
const SCHEMA = { tab: "string", ...buildSchema(MEDICINE_CONFIG), ...buildSchema(DOCTOR_CONFIG) };

export default function SearchResults() {
  const t = useTranslations('Catalog');
  const { state, update, reset } = useUrlFilters(DEFAULTS, SCHEMA);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const medicineConfig = useMemo(() => getMedicineConfig(t), [t]);
  const doctorConfig = useMemo(() => getDoctorConfig(t), [t]);
  const medicineData = useMemo(() => getMedicines(t), [t]);
  const doctorData = useMemo(() => getDoctors(t), [t]);

  const tab = state.tab === "doctors" ? "doctors" : "medicines";
  const config = tab === "doctors" ? doctorConfig : medicineConfig;
  const data = tab === "doctors" ? doctorData : medicineData;

  const TABS = useMemo(() => [
    { value: "medicines", label: t('tabs.medicines'), icon: Pill },
    { value: "doctors", label: t('tabs.doctors'), icon: Stethoscope },
  ], [t]);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 350);
    return () => clearTimeout(timer);
  }, [tab]);

  const results = useMemo(() => applyFilters(data, config, state), [data, config, state]);
  const activeCount = useMemo(() => countActive(config, state), [config, state]);

  const handleReset = () => {
    const next = { ...DEFAULTS, tab };
    reset(next);
  };

  return (
    <div>
      <PageHeader
        title={t('title')}
        subtitle={t('subtitle')}
        crumbs={[{ label: t('crumbs.catalog') }]}
      />

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Tabs */}
        <div className="mb-4 inline-flex rounded-xl border border-border bg-card p-1">
          {TABS.map((tItem) => {
            const active = tab === tItem.value;
            return (
              <button
                key={tItem.value}
                onClick={() => {
                  const cfg = tItem.value === "doctors" ? doctorConfig : medicineConfig;
                  update("tab", tItem.value);
                  update("sort", cfg.sorts[0].value);
                }}
                className={cn(
                  "inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors cursor-pointer",
                  active ? "bg-primary text-primary-foreground shadow-sm" : "text-foreground hover:bg-accent"
                )}
              >
                <tItem.icon className="h-4 w-4" /> {tItem.label}
              </button>
            );
          })}
        </div>

        {/* Search + sort + mobile filters */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-text-muted" />
            <input
              value={state.q}
              onChange={(e) => update("q", e.target.value)}
              placeholder={config.search.placeholder}
              className="h-12 w-full rounded-xl border border-border bg-card pl-11 pr-9 text-sm text-foreground placeholder:text-text-muted outline-none focus:border-primary transition-colors"
            />
            {state.q && (
              <button
                onClick={() => update("q", "")}
                aria-label={t('clearSearch')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-foreground cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <SortSelect options={config.sorts} value={state.sort} onChange={(v) => update("sort", v)} />
          <Button
            variant="outline"
            className="relative gap-2 lg:hidden cursor-pointer"
            onClick={() => setDrawerOpen(true)}
          >
            <SlidersHorizontal className="h-4 w-4" /> {t('filters')}
            {activeCount > 0 && (
              <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-[11px] font-semibold text-primary-foreground">
                {activeCount}
              </span>
            )}
          </Button>
        </div>

        {/* Active chips */}
        <div className="mt-4">
          <FilterChips config={config} state={state} update={update} onClear={handleReset} />
        </div>

        {/* Layout */}
        <div className="mt-5 grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr] items-start">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block">
            <div className="rounded-xl border border-border bg-card p-4">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-foreground">{t('filters')}</h3>
                {activeCount > 0 && (
                  <button onClick={handleReset} className="text-xs font-medium text-primary hover:text-primary/80 cursor-pointer">
                    {t('reset')}
                  </button>
                )}
              </div>
              <FilterPanel config={config} state={state} update={update} />
            </div>
          </aside>

          {/* Results */}
          <div>
            <p className="mb-3 text-sm text-text-muted">
              {t('found')} <span className="font-semibold text-foreground">{results.length}</span>
            </p>

            {loading ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {[...Array(6)].map((_, i) => (
                  <Skeleton key={i} className="h-44 rounded-xl" />
                ))}
              </div>
            ) : results.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card px-6 py-16 text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-primary">
                  <Inbox className="h-7 w-7" />
                </span>
                <h3 className="mt-4 text-base font-semibold text-foreground">{t('nothingFoundTitle')}</h3>
                <p className="mt-1 max-w-sm text-sm text-text-muted">
                  {t('nothingFoundSubtitle')}
                </p>
                <Button variant="outline" className="mt-4 gap-1.5 cursor-pointer" onClick={handleReset}>
                  <X className="h-4 w-4" /> {t('clearFilters')}
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {results.map((item) =>
                  tab === "doctors" ? (
                    <DoctorResultCard key={item.id} item={item} />
                  ) : (
                    <MedicineResultCard key={item.id} item={item} />
                  )
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <FilterDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        config={config}
        state={state}
        update={update}
        onClear={handleReset}
        resultCount={results.length}
      />
    </div>
  );
}
