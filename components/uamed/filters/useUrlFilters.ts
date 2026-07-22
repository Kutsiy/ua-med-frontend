import { useState, useCallback } from 'react';

export function buildDefaults(config: any) {
  const defaults: Record<string, any> = {
    q: '',
    sort: config.sorts?.[0]?.value || '',
  };
  if (config.filters) {
    config.filters.forEach((f: any) => {
      if (f.type === 'select') {
        defaults[f.id] = 'all';
      } else if (f.type === 'range') {
        defaults[f.minKey] = '';
        defaults[f.maxKey] = '';
      } else if (f.type === 'boolean') {
        defaults[f.key] = false;
      }
    });
  }
  return defaults;
}

export function buildSchema(config: any) {
  const schema: Record<string, string> = { q: 'string', sort: 'string' };
  if (config.filters) {
    config.filters.forEach((f: any) => {
      if (f.type === 'select') {
        schema[f.id] = 'string';
      } else if (f.type === 'range') {
        schema[f.minKey] = 'number';
        schema[f.maxKey] = 'number';
      } else if (f.type === 'boolean') {
        schema[f.key] = 'boolean';
      }
    });
  }
  return schema;
}

export function useUrlFilters(defaults: Record<string, any>, _schema: Record<string, string>) {
  const [state, setState] = useState<Record<string, any>>(defaults);

  const update = useCallback((key: string, value: any) => {
    setState((prev) => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  const reset = useCallback((nextState?: Record<string, any>) => {
    setState(nextState || defaults);
  }, [defaults]);

  return { state, update, reset };
}
