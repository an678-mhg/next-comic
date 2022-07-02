import React, { FC } from "react";
import { ArrowNarrowRightIcon } from "@heroicons/react/solid";

interface TileProps {
  children: React.ReactNode;
}

const Title: FC<TileProps> = ({ children }) => {
  return (
    <div className="flex items-center">
      <h1 className="text-xl font-semibold">{children}</h1>

      <span>
        <ArrowNarrowRightIcon className="w-6 h-6 text-[#4599FF] ml-2" />
      </span>
    </div>
  );
};

export default Title;
