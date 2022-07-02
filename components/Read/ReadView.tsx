import React, { FC } from "react";
import { ReadChap } from "../../models/comics";

interface PropsType {
  results: ReadChap[];
}

const ReadView: FC<PropsType> = ({ results }) => {
  return (
    <div className="flex-1 h-[calc(100vh-48px)] overflow-y-scroll">
      {results.map((item) => (
        <div className="w-[50%] mx-auto max-w-full" key={item.alt}>
          <img src={item.img} alt={item.alt} />
        </div>
      ))}
    </div>
  );
};

export default ReadView;
