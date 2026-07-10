import { create } from 'zustand';

type User = {
  id?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  phoneNumber?: string;
  email?: string;
  isActivated: boolean;
};

type AuthStore = {
  isAuthenticated: boolean;
  user: User;
  updateAuthenticated: (flag: boolean) => void;
  updateUser: (user: User) => void;
};

export const userAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: false,
  user: {
    id: undefined,
    firstName: undefined,
    middleName: undefined,
    lastName: undefined,
    isActivated: false,
    email: undefined,
    phoneNumber: undefined,
  },
  updateUser: (user: User) => set({ user }),
  updateAuthenticated: (flag: boolean) => set({ isAuthenticated: flag }),
}));
