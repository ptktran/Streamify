import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
export const useSessionStore = create()(
  persist(
    (set) => ({
      Name: "",
      SetName: (name) => set(() => ({ Name: name })),
    }),
    {
      name: "Current User",
      partialize: (state) => ({ Name: state.Name }),
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: (state) => {
        console.log("hydration starts");
        // Testing Hydration
        return (state, error) => {
          if (error) {
            console.log("an error happened during hydration", error);
          } else {
            console.log("hydration finished");
          }
        };
      },
    }
  )
);
