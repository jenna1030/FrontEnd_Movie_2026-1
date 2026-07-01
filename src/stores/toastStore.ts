import { create } from "zustand";

type ToastType = "review" | "favorite";

type ToastState = {
  isOpen: boolean;
  message: string;
  type: ToastType | null;
  showToast: (message: string, type: ToastType) => void;
  hideToast: () => void;
};

export const useToastStore = create<ToastState>((set) => ({
  isOpen: false,
  message: "",
  type: null,

  showToast: (message, type) => {
    set({
      isOpen: true,
      message,
      type,
    });
  },

  hideToast: () => {
    set({
      isOpen: false,
      message: "",
      type: null,
    });
  },
}));
