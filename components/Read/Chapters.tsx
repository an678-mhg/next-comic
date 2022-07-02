import React, { FC } from "react";
import Link from "next/link";
import { NewChapterType } from "../../models/comics";

interface PropsType {
  chapters: NewChapterType[];
  slug: string;
}

const Chapters: FC<PropsType> = ({ chapters, slug }) => {
  return (
    <div className="w-[20%] h-[calc(100vh-48px)] bg-primary-100 overflow-y-scroll">
      <Link href="/">
        <a className="text-white p-3 text-center block fixed w-full top-0 bg-primary-200">
          {" "}
          Về trang chủ
        </a>
      </Link>

      <ul className="p-5">
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
