import React, { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { ComicType } from "../../models/comics";
import ComicsItem from "./ComicsItem";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import useSlideViews from "../../hooks/useSlideViews";

interface SlideViewsProps {
  data: ComicType[];
}

const SlideViews: FC<SlideViewsProps> = ({ data }) => {
  const slide = useSlideViews();

  return (
    <>
      <Swiper
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
        slidesPerView={slide}
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
