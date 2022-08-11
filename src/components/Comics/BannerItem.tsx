import Link from "next/link";
import React, { FC } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Banner } from "../../models/comics";

interface BannerItemProps {
  item: Banner;
}

const BannerItem: FC<BannerItemProps> = ({ item }) => {
  return (
    <div className="relative bg-[#111]">
      <div
        style={{
          background: `url(${item.img})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
        className="banner w-full lg:h-[450px] md:h-[350px] h-[250px] overflow-hidden blur"
      ></div>

      <div className="absolute top-0 bottom-0 right-0 left-0 z-10 container py-5 flex items-center justify-between">
        <div className="text-white lg:w-[70%] w-full mr-4">
          <div className="mb-4">
            <h1 className="text-3xl font-semibold text-white line-clamp-1">
              {item.name}
            </h1>
          </div>

          <div className="mb-4">
            <p className="text-sm font-normal line-clamp-3">
              {item.description}
            </p>
          </div>

          <div className="mb-4 md:block hidden">
            {Object.keys(item.info)
              .splice(0, 1)
              .filter((a) => item.info[a].split(",").length > 1)
              .map((p) => (
                <div key={p} className="flex items-center flex-wrap">
                  {item.info[p].split(",").map((item) => (
                    <p className="px-2 py-1 rounded-md border-2 mr-2 mb-2">
                      {item}
                    </p>
                  ))}
                </div>
              ))}
          </div>

          <Link href={`/manga${item.href}`}>
            <a>
              <button className="bg-blue-500 font-semibold px-3 py-2 rounded-md">
                Đọc ngay
              </button>
            </a>
          </Link>
        </div>
        <div className="flex-1 hidden items-center justify-center lg:flex">
          <div className="w-[250px] aspect-[250/353]">
            <LazyLoadImage
              width="100%"
              height="100%"
              src={item.img}
              alt={item.name}
              effect="blur"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerItem;
