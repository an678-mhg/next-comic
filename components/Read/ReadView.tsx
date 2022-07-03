import React, { FC } from "react";
import { ReadChap } from "../../models/comics";
import { getImage } from "../../shared/constant";
import { MenuAlt1Icon, XIcon } from "@heroicons/react/solid";

interface PropsType {
  results: ReadChap[];
  showChapters: boolean;
  setShowChapters: Function;
}

const ReadView: FC<PropsType> = ({
  results,
  setShowChapters,
  showChapters,
}) => {
  return (
    <div className="flex-1 h-[calc(100vh-48px)] overflow-y-scroll">
      <button
        onClick={() => setShowChapters(!showChapters)}
        className="absolute top-[5px] left-[16px] lg:hidden block bg-blue-500 p-1"
      >
        {showChapters ? (
          <XIcon className="w-6 h-6 text-text-color" />
        ) : (
          <MenuAlt1Icon className="w-6 h-6 text-text-color" />
        )}
      </button>

      {results.map((item) => (
        <div className="md:w-[50%] mx-auto w-[calc(100%-32px)]" key={item.alt}>
          <img
            className="border border-black"
            src={getImage(item.img)}
            alt={item.alt}
          />
        </div>
      ))}
    </div>
  );
};

export default ReadView;
