import React, { FC } from "react";

interface GridLayoutProps {
  children: React.ReactNode;
  className?: React.HTMLProps<HTMLDivElement>;
}

const GridLayout: FC<GridLayoutProps> = ({ children, className }) => {
  return <div className={`grid grid-cols-4 ${className}`}>{children}</div>;
};

export default GridLayout;
