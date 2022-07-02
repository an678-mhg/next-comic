import Link from "next/link";
import React, { FC } from "react";
import { ComicType } from "../../models/comics";

interface PropsType {
  top_manga_month: ComicType[];
}

const RankMonth: FC<PropsType> = ({ top_manga_month }) => {
  return (
    <div className="lg:w-[320px] w-full border-2 p-2 mt-4 lg:mt-0">
      <h1 className="my-4 text-center font-semibold text-xl">Top tháng</h1>
      <hr />
      <ul>
        {top_manga_month.map((item) => (
          <li
            key={item.href}
            className="flex items-center py-2 justify-between border-t-1 border-b-2"
          >
            <div className="flex items-center">
              <div className="w-[60px] h-[60px]">
                <img src={item.img} alt={item.name} />
              </div>
            </div>
            <Link href={`/manga${item.href}`}>
              <a className="flex-1 ml-3">
                <p className="text-sm font-semibold">{item.name}</p>
                <p className="text-sm font-semibold">
                  {item.newChapters[0] && item.newChapters[0].name}
                </p>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RankMonth;
