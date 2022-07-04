import React, { FC } from "react";
import { ArrowNarrowRightIcon } from "@heroicons/react/solid";

interface TileProps {
  children: React.ReactNode;
  icons?: React.ReactNode;
  position: "start" | "end";
}

const Title: FC<TileProps> = ({
  children,
  icons = <ArrowNarrowRightIcon className="w-6 h-6 ml-1 text-blue-500" />,
  position = "end",
}) => {
  return (
    <div className="flex items-center">
      {position === "start" && icons}
      <h1 className="text-xl font-semibold text-text-color">{children}</h1>
      {position === "end" && icons}
    </div>
  );
};

export default Title;
