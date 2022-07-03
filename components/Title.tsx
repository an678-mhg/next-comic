import React, { FC } from "react";
import { ArrowNarrowRightIcon } from "@heroicons/react/solid";

interface TileProps {
  children: React.ReactNode;
  icons: React.ReactNode;
  position: "start" | "end";
}

const Title: FC<TileProps> = ({ children, icons, position }) => {
  return (
    <div className="flex items-center">
      {position === "start" && icons}
      <h1 className="text-xl font-semibold">{children}</h1>
      {position === "end" && icons}
    </div>
  );
};

export default Title;
