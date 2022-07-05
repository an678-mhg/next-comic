import React, { FC } from "react";

interface GridLayoutProps {
  children: React.ReactNode;
  className?: React.HTMLProps<HTMLDivElement>;
}

const GridLayout: FC<GridLayoutProps> = ({ children, className }) => {
  return (
    <div
      className={`grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4 ${className}`}
    >
      {children}
    </div>
  );
};

export default GridLayout;
