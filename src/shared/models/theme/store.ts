import { create } from 'zustand';

type ThemeStore = {
  theme: 'light' | 'dark';
  updateTheme: (theme: 'light' | 'dark') => void;
};

export const useThemeStore = create<ThemeStore>((set) => ({
  theme: 'dark',
  updateTheme: (theme: 'light' | 'dark') => set({ theme }),
}));
