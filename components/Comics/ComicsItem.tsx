import React, { FC, Key } from "react";
import { ComicType } from "../../models/comics";

interface PropsType {
  item: ComicType;
}

const ComicsItem: FC<PropsType> = ({ item }) => {
  return (
    <div>
      <div className="aspect-[2/1">
        <img alt={item.name} src={item.img} />
      </div>
      <div className={`p-2 bg-primary-300`}>
        <h3 className="text-text-color font-semibold text-sm mb-2 line-clamp-1">
          {item.name}
        </h3>
        <div>
          {item.newChapters?.map((p) => (
            <div
              className="flex items-center justify-between py-1"
              key={p.href as Key}
            >
              <p className="text-text-color text-xs">{p.name}</p>
              <p className="text-[10px] text-gray-500">{p.time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ComicsItem;
