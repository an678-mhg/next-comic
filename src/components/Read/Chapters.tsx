import React, {
  FC,
  memo,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";
import Link from "next/link";
import { NewChapterType } from "../../models/comics";
import { useRouter } from "next/router";

interface PropsType {
  chapters: NewChapterType[];
  slug: string;
  showChapters: boolean;
}

const Chapters: FC<PropsType> = ({ chapters, slug, showChapters }) => {
  const router = useRouter();

  const [searchChap, setSearchChap] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isPending, startTransition] = useTransition();

  const chaptersMemo = useMemo(() => {
    return chapters?.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, chapters]);

  useEffect(() => {
    setSearchChap("");
    setSearchQuery("");
  }, [router.asPath]);

  return (
    <div
      className={`lg:w-[20%] max-w-full h-screen transition-all bg-primary-100 overflow-y-scroll lg:block fixed top-0 lg:mt-0 pt-10 bottom-0 ${
        showChapters ? "left-0" : "left-[-100%]"
      } right-0 lg:static scroll-none`}
    >
      <div>
        <div className="px-4 pt-4">
          <input
            className="w-full py-2 px-3 bg-primary-300 rounded-md text-text-color"
            placeholder="Tìm kiếm chap..."
            onChange={(e) => {
              setSearchChap(e.target.value);

              startTransition(() => {
                setSearchQuery(e.target.value);
              });
            }}
            value={searchChap}
          />
        </div>
      </div>
      <ul className="px-4 mt-4 h-[calc(100vh-120px)] overflow-y-auto scroll-none">
        {isPending ? (
          <div className="p-2 bg-primary-300 rounded-md text-text-color">
            Đang tìm.....
          </div>
        ) : (
          chaptersMemo?.map((item) => (
            <li
              key={item.href}
              className={`w-full p-2 rounded-md ${
                slug === item.href ? "bg-[#2374E1]" : "bg-primary-300"
              } mb-4`}
            >
              <Link href={`/read${item.href}`}>
                <a className="text-text-color flex items-center">
                  <p className="text-sm line-clamp-1">{item.name}</p>
                </a>
              </Link>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default memo(Chapters);
