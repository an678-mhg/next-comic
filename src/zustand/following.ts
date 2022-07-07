import create from "zustand";
import { ComicType } from "../models/comics";

interface Stored {
  following: ComicType[];
  loading: boolean;
  addFollow: (comic: ComicType) => void;
  deleteFollow: (comic: ComicType) => void;
  setFollow: (comics: ComicType[]) => void;
  setLoading: (newLoading: boolean) => void;
}

const useStore = create<Stored>((set) => ({
  following: [],
  loading: false,
  addFollow: (comic: ComicType) =>
    set((state) => ({ following: [...state.following, comic] })),
  deleteFollow: (comic: ComicType) =>
    set((state) => ({
      following: state.following.filter((item) => item.href !== comic.href),
    })),
  setFollow: (comics: ComicType[]) => set(() => ({ following: comics })),
  setLoading: (newLoading: boolean) => set(() => ({ loading: newLoading })),
}));

export default useStore;
