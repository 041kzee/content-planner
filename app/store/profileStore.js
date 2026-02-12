import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useProfileStore = create(
  persist(
    (set) => ({
      profile: null,

      setProfile: (profileData) =>
        set({ profile: profileData }),

      clearProfile: () =>
        set({ profile: null }),
    }),
    {
      name: "profile-storage", 
    }
  )
);
