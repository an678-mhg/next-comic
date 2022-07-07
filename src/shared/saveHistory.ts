import { ComicType } from "../models/comics";

export const addComicToLocal = (comic: ComicType) => {
  let historyComic: ComicType[] =
    JSON.parse(localStorage.getItem("history-next-comic") as string) || [];

  const existComic = historyComic.some(
    (item: ComicType) => item.href === comic.href
  );

  if (existComic) {
    historyComic = historyComic.filter(
      (item: ComicType) => item.href !== comic.href
    );
  }

  historyComic.unshift(comic);
  localStorage.setItem("history-next-comic", JSON.stringify(historyComic));
};

export const getHistoryComic = () => {
  let historyComic: ComicType[] =
    JSON.parse(localStorage.getItem("history-next-comic") as string) || [];
  return historyComic;
};
