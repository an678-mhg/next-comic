import Skeleton from "../Skeleton";
import React from "react";

const SliderSkeleton = () => {
  return (
    <div className="mb-4">
      <div className="mb-4">
        <h1 className="skeleton w-[150px] h-5 rounded-sm"></h1>
      </div>
      <Skeleton element={6} />
    </div>
  );
};

export default SliderSkeleton;
