export interface NewChapterType {
  name: string;
  href: string;
  time: string;
}

export interface ComicType {
  id?: string;
  href: string;
  name: string;
  img: string;
  uid?: string;
  description?: string;
  newChapter?: NewChapterType;
  newChapters?: NewChapterType[];
}

export interface Banner extends ComicType {
  info: {
    [key: string]: string;
  };
}

export interface ReadChap {
  img: string;
  alt: string;
}
