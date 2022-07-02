import React, { FC, useState } from "react";
import Link from "next/link";
import { NewChapterType } from "../../models/comics";

interface PropsType {
  chapters: NewChapterType[];
  slug: string;
  showChapters: boolean;
}

const Chapters: FC<PropsType> = ({ chapters, slug, showChapters }) => {
  return (
    <div
      className={`lg:w-[20%] max-w-full lg:h-[calc(100vh-48px)] transition-all bg-primary-100 overflow-y-scroll lg:block fixed top-[48px] bottom-0 ${
        showChapters ? "left-0" : "left-[-100%]"
      } right-0 lg:static`}
    >
      <Link href="/">
        <a className="text-white p-3 text-center block fixed w-full top-0 bg-primary-200">
          {" "}
          Về trang chủ
        </a>
      </Link>

      <ul className="p-4">
        {chapters.map((item) => (
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
        ))}
      </ul>
    </div>
  );
};

export default Chapters;
