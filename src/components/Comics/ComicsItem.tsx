import Link from "next/link";
import React, { FC, HTMLProps, Key } from "react";
import { ComicType } from "../../models/comics";

interface PropsType {
  item: ComicType;
}

const ComicsItem: FC<PropsType> = ({ item }) => {
  return (
    <Link href={`/manga${item.href}`}>
      <a className="block rounded-sm overflow-hidden">
        <div className="h-[250px]">
          <img src={item.img} alt={item.name} />
        </div>
        <div className={`p-2 bg-primary-300`}>
          <h3 className="text-text-color font-semibold text-sm mb-2 line-clamp-1">
            {item.name}
          </h3>
        </div>
      </a>
    </Link>
  );
};

export default ComicsItem;
