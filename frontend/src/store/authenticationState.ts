import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface AuthenticationState {
  cleanSession: () => void;
  isSchoolSelected: null | string;
  setSchoolSelection: (school: string | null) => void;
}

export const useAuthState = create<AuthenticationState>()(
  immer((set) => ({
    cleanSession: () => {
      set((state) => {
        state.isSchoolSelected = null;
      });
    },
    isSchoolSelected: null,
    setSchoolSelection: (school) => {
      set((state) => {
        state.isSchoolSelected = school;
      });
    },
  })),
);

export const useAllowSecuredRoutes = () => {
  const people = useAuthState((state) => state.isSchoolSelected);

  return people !== null;
};
