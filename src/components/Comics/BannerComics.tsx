import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import useSWR from "swr";
import { getBanner } from "../../services/home";
import { Navigation, Autoplay } from "swiper";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Error from "../Error";
import BannerItem from "./BannerItem";

const BannerComics = () => {
  const { data, error } = useSWR("banner", getBanner);

  if (error) {
    return <Error />;
  }

  return (
    <div>
      {!data ? (
        <div className="lg:h-[450px] md:h-[350px] h-[250px] skeleton w-full"></div>
      ) : (
        <Swiper
          navigation
          autoplay={{ delay: 5000 }}
          modules={[Navigation, Autoplay]}
          className="mySwiper"
          slidesPerView={1}
        >
          {data.map((item) => (
            <SwiperSlide key={item.href}>
              <BannerItem item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default BannerComics;
