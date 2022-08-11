import Link from "next/link";
import React, { FC, useId } from "react";
import { ComicType } from "../../models/comics";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

interface PropsType {
  item: ComicType;
  showEdit?: boolean;
  handleSelect?: (comic: ComicType) => void;
  check?: ComicType[];
}

const ComicsItem: FC<PropsType> = ({ item, check, handleSelect, showEdit }) => {
  const id = useId();

  return (
    <div>
      <Link href={`/manga${item.href}`}>
        <a className="block overflow-hidden">
          <div className="aspect-[250/353] bg-[#222]">
            <LazyLoadImage
              src={item.img}
              alt={item.name}
              effect="blur"
              width="100%"
              height="100%"
            />
          </div>
          <div className={`p-2 bg-primary-300 mt-[-6px]`}>
            <h3 className="text-text-color font-semibold text-sm mb-2 line-clamp-1 hover:text-blue-500">
              {item.name}
            </h3>
          </div>
        </a>
      </Link>

      {showEdit && (
        <>
          {check && (
            <input
              onChange={() => {
                if (handleSelect) {
                  handleSelect(item);
                }
              }}
              type="checkbox"
              id={id}
              className="radio-input"
              name="gender"
              checked={check.some((comic) => comic?.id === item?.id)}
            />
          )}
          <label htmlFor={id} className="radio-label"></label>
        </>
      )}
    </div>
  );
};

export default ComicsItem;
