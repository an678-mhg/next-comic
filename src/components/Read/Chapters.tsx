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
import { ChevronDoubleLeftIcon } from "@heroicons/react/solid";
import { ChevronDoubleRightIcon } from "@heroicons/react/outline";
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
    return chapters.filter((item) => item.name.includes(searchQuery));
  }, [searchQuery]);

  useEffect(() => {
    setSearchChap("");
    setSearchQuery("");
  }, [router.asPath]);

  const handleNextChap = () => {
    const pathCurrent = router.asPath.split("/read")[1];
    const indexCurrent = chapters.findIndex(
      (item) => item.href === pathCurrent
    );

    const nextIndex = indexCurrent - 1;

    if (nextIndex >= 0) {
      const nextPath = chapters[nextIndex].href;
      router.push(`/read${nextPath}`);
    }
  };

  const handlePrevChap = () => {
    const pathCurrent = router.asPath.split("/read")[1];
    const indexCurrent = chapters.findIndex(
      (item) => item.href === pathCurrent
    );

    const prevIndex = indexCurrent + 1;

    if (prevIndex <= chapters.length - 1) {
      const prevPath = chapters[prevIndex].href;
      router.push(`/read${prevPath}`);
    }
  };

  return (
    <div
      className={`lg:w-[20%] max-w-full h-screen transition-all bg-primary-100 overflow-y-scroll lg:block fixed top-0 lg:mt-0 pt-10 bottom-0 ${
        showChapters ? "left-0" : "left-[-100%]"
      } right-0 lg:static scroll-none`}
    >
      <div>
        <div className="flex items-center px-4 pt-4 justify-between gap-4">
          <button
            onClick={handlePrevChap}
            className={`py-1 px-2 w-full rounded-md  ${
              chapters.findIndex(
                (item) => item.href === router.asPath.split("/read")[1]
              ) >=
              chapters.length - 1
                ? "bg-gray-500 text-gray-600 opacity-30 cursor-not-allowed"
                : "bg-primary-300 text-blue-500"
            }`}
            title="Chap trước"
          >
            <ChevronDoubleLeftIcon className="w-6 h-6 mx-auto" />
          </button>
          <button
            onClick={handleNextChap}
            className={`py-1 px-2 w-full rounded-md ${
              chapters.findIndex(
                (item) => item.href === router.asPath.split("/read")[1]
              ) <= 0
                ? "bg-gray-500 text-gray-600 opacity-30 cursor-not-allowed"
                : "bg-primary-300 text-blue-500"
            }`}
            title="Chap tiếp theo"
          >
            <ChevronDoubleRightIcon className="w-6 h-6 mx-auto" />
          </button>
        </div>
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
      <ul className="px-4 mt-4 h-[calc(100vh-180px)] overflow-y-auto scroll-none">
        {isPending ? (
          <div className="p-2 bg-primary-300 rounded-md text-text-color">
            Đang tìm.....
          </div>
        ) : (
          chaptersMemo.map((item) => (
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
