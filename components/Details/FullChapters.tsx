import React, { FC } from "react";
import { NewChapterType } from "../../models/comics";
import Title from "../Title";
import { MenuIcon } from "@heroicons/react/solid";
import Link from "next/link";

interface FullChaptersProps {
  chapters: NewChapterType[];
}

const FullChapters: FC<FullChaptersProps> = ({ chapters }) => {
  return (
    <div>
      <div className="mt-4">
        <Title
          position="start"
          icons={<MenuIcon className="w-6 h-6 text-blue-500 mr-1" />}
        >
          Danh sách chương
        </Title>
      </div>

      <div className="border border-primary-300 mt-4 text-text-color">
        <ul className="w-full h-[350px] overflow-y-scroll">
          {chapters.map((item) => (
            <li key={item.href}>
              <Link href={`/read${item.href}`}>
                <a className="flex items-center justify-between p-2">
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-gray-500 text-sm">{item.time}</p>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FullChapters;
