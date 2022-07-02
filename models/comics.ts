interface NewChapterType {
  name: String;
  href: String;
  time: String;
}

export interface ComicType {
  href: String;
  name: String;
  img: String;
  newChapter?: NewChapterType;
  newChapters?: NewChapterType[];
}
