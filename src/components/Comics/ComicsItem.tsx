import Link from "next/link";
import React, { FC, HTMLProps, Key } from "react";
import { ComicType } from "../../models/comics";

interface PropsType {
  item: ComicType;
}

const ComicsItem: FC<PropsType> = ({ item }) => {
  return (
    <Link href={`/manga${item.href}`}>
      <a className="relative wrap-comic-item block rounded-sm overflow-hidden">
        <div className="h-[250px]">
          <img src={item.img} alt={item.name} />
        </div>
        <div className={`p-2 bg-primary-300`}>
          <h3 className="text-text-color font-semibold text-sm mb-2 line-clamp-1">
            {item.name}
          </h3>
          <div className="absolute bottom-[43px] left-0 right-0 p-2 bg-primary-300 new-chapters lg:hidden block">
            {item.newChapters?.map((p) => (
              <Link href={`/read${p.href}`} key={p.href as Key}>
                <a className="flex items-center justify-between py-1">
                  <p className="text-text-color text-xs">{p.name}</p>
                  <p className="text-[10px] text-gray-500">{p.time}</p>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </a>
    </Link>
  );
};

export default ComicsItem;
