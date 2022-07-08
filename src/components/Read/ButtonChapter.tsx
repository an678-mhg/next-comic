import React, { FC } from "react";
import { ChevronDoubleLeftIcon } from "@heroicons/react/solid";
import { ChevronDoubleRightIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import { NewChapterType } from "../../models/comics";

interface ButtonChapterProps {
  chapters: NewChapterType[];
}

const ButtonChapter: FC<ButtonChapterProps> = ({ chapters }) => {
  const router = useRouter();

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
    <div className="flex items-center justify-between gap-4">
      <button
        onClick={handlePrevChap}
        className={`py-1 px-2 w-full rounded-md  ${
          chapters.findIndex(
            (item) => item.href === router.asPath.split("/read")[1]
          ) >=
          chapters.length - 1
            ? "bg-gray-500 text-gray-600 opacity-30 cursor-not-allowed"
            : "bg-primary-200 text-blue-500"
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
            : "bg-primary-200 text-blue-500"
        }`}
        title="Chap tiếp theo"
      >
        <ChevronDoubleRightIcon className="w-6 h-6 mx-auto" />
      </button>
    </div>
  );
};

export default ButtonChapter;
