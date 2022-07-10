import React, { FC, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { ComicType } from "../../models/comics";
import ComicsItem from "./ComicsItem";
import { Navigation } from "swiper";
import useInnerWidth from "../../hooks/useInnerWidth";
import "swiper/css";
import "swiper/css/navigation";

interface SlideViewsProps {
  data: ComicType[];
}

const SlideViews: FC<SlideViewsProps> = ({ data }) => {
  const width = useInnerWidth();
  const slide = useMemo(() => {
    if (width === null) {
      return null;
    } else {
      if (width > 1200) {
        return 6;
      } else if (width > 1024) {
        return 5;
      } else if (width > 768) {
        return 4;
      } else if (width > 500) {
        return 3;
      } else {
        return 2;
      }
    }
  }, [width]);

  return (
    <>
      <Swiper
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
        slidesPerView={slide || 0}
        spaceBetween={20}
      >
        {data.map((item) => (
          <SwiperSlide key={item.href}>
            <ComicsItem item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default SlideViews;
