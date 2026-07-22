export function applyFilters(data: any[], config: any, state: Record<string, any>): any[] {
  let result = [...data];

  // 1. Text Search Filter
  if (state.q && state.q.trim()) {
    const q = state.q.trim().toLowerCase();
    result = result.filter((item) => {
      const nameMatch = item.name?.toLowerCase().includes(q);
      const formMatch = item.form?.toLowerCase().includes(q);
      const specialtyMatch = item.specialty?.toLowerCase().includes(q);
      const clinicMatch = item.clinic?.toLowerCase().includes(q);
      const categoryMatch = item.category?.toLowerCase().includes(q);
      const manufacturerMatch = item.manufacturer?.toLowerCase().includes(q);
      return nameMatch || formMatch || specialtyMatch || clinicMatch || categoryMatch || manufacturerMatch;
    });
  }

  // 2. Dynamic Config Filters
  if (config.filters) {
    config.filters.forEach((f: any) => {
      const val = state[f.id];

      if ((f.type === 'select' || f.type === 'searchable-select') && val && val !== 'all') {
        result = result.filter((item) => {
          if (Array.isArray(item[f.id])) {
            return item[f.id].includes(val);
          }
          return item[f.id] === val;
        });
      } else if (f.type === 'slider-range' || f.type === 'range') {
        const minVal = parseFloat(state[f.minKey]);
        const maxVal = parseFloat(state[f.maxKey]);
        if (!isNaN(minVal)) {
          result = result.filter((item) => item.price >= minVal);
        }
        if (!isNaN(maxVal)) {
          result = result.filter((item) => item.price <= maxVal);
        }
      } else if (f.type === 'boolean' && state[f.key] === true) {
        result = result.filter((item) => item[f.key] === true);
      }
    });
  }

  // 3. Sorting logic
  if (state.sort) {
    result.sort((a, b) => {
      switch (state.sort) {
        case 'price_asc':
          return a.price - b.price;
        case 'price_desc':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'nearest':
          return (a.distance || 0) - (b.distance || 0);
        case 'alphabet':
          return a.name.localeCompare(b.name, 'uk');
        case 'popular':
          return (b.reviews || 0) - (a.reviews || 0);
        case 'relevance':
        default:
          return 0;
      }
    });
  }

  return result;
}

export function countActive(config: any, state: Record<string, any>): number {
  let count = 0;
  if (state.q && state.q.trim()) count++;

  if (config.filters) {
    config.filters.forEach((f: any) => {
      const val = state[f.id];
      if ((f.type === 'select' || f.type === 'searchable-select') && val && val !== 'all') {
        count++;
      } else if (f.type === 'slider-range' || f.type === 'range') {
        if (state[f.minKey] !== undefined && state[f.minKey] !== '') count++;
        if (state[f.maxKey] !== undefined && state[f.maxKey] !== '') count++;
      } else if (f.type === 'boolean' && state[f.key] === true) {
        count++;
      }
    });
  }

  return count;
}
