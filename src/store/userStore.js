// store/userStore.js
import { create } from "zustand";

export const useUserStore = create((set) => ({
  name: "",
  isNeedUpdate: false,
  setName: (newName) => {
    set({ name: newName });
  },
  setIsNeedUpdate: (status) => {
    set({ isNeedUpdate: status });
  },
}));
