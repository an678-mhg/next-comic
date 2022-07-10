import React from "react";
import SkeletonComicsItem from "../Comics/SkeletonComicsItem";
import GridLayout from "../Layout/GridLayout";

const Skeleton = ({ element }: { element: number }) => {
  return (
    <GridLayout>
      {Array.from(Array(element).keys()).map((item) => (
        <SkeletonComicsItem key={item} />
      ))}
    </GridLayout>
  );
};

export default Skeleton;
