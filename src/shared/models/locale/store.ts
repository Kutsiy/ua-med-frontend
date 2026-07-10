import { create } from 'zustand';

type LocaleStore = {
  locale: 'ua' | 'en';
  updateLocale: (locale: 'ua' | 'en') => void;
};

export const useLocaleStore = create<LocaleStore>((set) => ({
  locale: 'ua',
  updateLocale: (locale: 'ua' | 'en') => set({ locale }),
}));
