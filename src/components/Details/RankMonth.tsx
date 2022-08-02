import Link from "next/link";
import React, { FC } from "react";
import { ComicType } from "../../models/comics";

interface PropsType {
  top_manga_month: ComicType[];
}

const RankMonth: FC<PropsType> = ({ top_manga_month }) => {
  return (
    <div className="lg:w-[320px] w-full bg-primary-300 p-2 mt-4 text-text-color rounded-md">
      <h1 className="my-4 text-center font-semibold text-xl text-text-color">
        Top tháng
      </h1>
      <hr />
      <ul>
        {top_manga_month.map((item) => (
          <li
            key={item.href}
            className="flex items-center py-2 justify-between border-b-primary-300"
          >
            <div className="flex items-center">
              <Link href={`/manga${item.href}`}>
                <a>
                  <div className="w-[60px] aspect-auto rounded-md overflow-hidden">
                    <img src={item.img} alt={item.name} />
                  </div>
                </a>
              </Link>
            </div>
            <Link href={`/manga${item.href}`}>
              <a className="flex-1 ml-3">
                <p className="text-sm font-semibold hover:text-blue-500">
                  {item.name}
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
