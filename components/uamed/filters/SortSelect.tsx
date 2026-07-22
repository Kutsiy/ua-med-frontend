import React, { useState, useRef, useEffect } from 'react';
import { ArrowUpDown, ChevronDown, Check } from 'lucide-react';
import { cn } from '@/src/shared/libs/utils';

interface SortSelectProps {
  options: { value: string; label: string }[];
  value: string;
  onChange: (val: string) => void;
}

export default function SortSelect({ options, value, onChange }: SortSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value) || options[0];

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={containerRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex h-12 items-center justify-between gap-3 rounded-xl border border-border bg-card px-4 text-sm font-medium text-foreground shadow-xs transition-colors hover:border-primary/50 cursor-pointer min-w-[200px]"
      >
        <span className="flex items-center gap-2">
          <ArrowUpDown className="size-4 text-text-muted" />
          <span className="truncate">{selectedOption?.label}</span>
        </span>
        <ChevronDown className={cn('size-4 text-text-muted transition-transform duration-200', isOpen && 'rotate-180')} />
      </button>

      {/* Popover Menu */}
      {isOpen && (
        <div className="absolute right-0 z-50 mt-2 w-64 origin-top-right rounded-xl border border-border bg-card p-2 shadow-xl ring-1 ring-black/5 animate-in fade-in-80 zoom-in-95">
          <div className="space-y-1">
            {options.map((opt) => {
              const isSelected = opt.value === value;
              return (
                <button
                  key={opt.value}
                  onClick={() => {
                    onChange(opt.value);
                    setIsOpen(false);
                  }}
                  className={cn(
                    'flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-left text-sm transition-colors cursor-pointer',
                    isSelected
                      ? 'bg-primary/10 font-medium text-primary'
                      : 'text-foreground hover:bg-accent'
                  )}
                >
                  <span>{opt.label}</span>
                  {isSelected && <Check className="size-4 text-primary" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
