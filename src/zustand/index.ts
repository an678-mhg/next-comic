import create from "zustand";

interface Stored {
  currentUser: any;
  setCurrentUser: (user: any) => void;
}

const useStore = create<Stored>((set) => ({
  currentUser: undefined,
  setCurrentUser: (user: any) => set(() => ({ currentUser: user })),
}));

export default useStore;
