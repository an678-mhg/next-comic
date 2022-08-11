import SkeletonAvatar from "antd/lib/skeleton/Avatar";
import React from "react";

const SkeletonDetails = () => {
  return (
    <div className="container pt-4">
      <div className="w-full flex items-center justify-center flex-col">
        <div className="mb-4">
          <h1 className="skeleton h-[20px] w-[200px]"></h1>
        </div>
        <p className="skeleton h-[20px] w-[180px]"></p>

        <div className="mt-4 flex w-full md:flex-row flex-col">
          <div className="flex items-center justify-center">
            <div className="skeleton w-[190px] h-[270px]"></div>
          </div>

          <div className="lg:ml-10 ml-0 flex-1">
            <div className="flex items-center justify-between">
              <div className="gap-2 flex flex-wrap my-3">
                <div className="w-8 h-8 rounded-full skeleton"></div>
                <div className="w-8 h-8 rounded-full skeleton"></div>
                <div className="w-8 h-8 rounded-full skeleton"></div>
                <div className="w-8 h-8 rounded-full skeleton"></div>
                <div className="w-8 h-8 rounded-full skeleton"></div>
              </div>
              <div className="w-[80px] h-[28px] skeleton rounded-md"></div>
            </div>

            <div>
              <div className="w-[300px] max-w-full h-[20px] skeleton mb-4"></div>
              <div className="w-[300px] max-w-full h-[20px] skeleton mb-4"></div>
              <div className="w-[300px] max-w-full h-[20px] skeleton mb-4"></div>
              <div className="w-[300px] max-w-full h-[20px] skeleton mb-4"></div>
              <div className="flex items-center">
                <div className="w-[80px] h-[28px] skeleton rounded-md mr-5"></div>
                <div className="w-[80px] h-[28px] skeleton rounded-md"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full mt-4">
          <div className="w-[150px] h-[20px] skeleton mb-4"></div>

          <div className="w-full h-[20px] skeleton mb-2"></div>
          <div className="w-full h-[20px] skeleton mb-2"></div>
          <div className="w-[80%] h-[20px] skeleton mb-2"></div>
        </div>

        <div className="w-full mt-4">
          <div className="w-[150px] h-[20px] skeleton mb-4"></div>

          <div className="w-full h-[20px] skeleton mb-2"></div>
          <div className="w-full h-[20px] skeleton mb-2"></div>
          <div className="w-[80%] h-[20px] skeleton mb-2"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonDetails;
