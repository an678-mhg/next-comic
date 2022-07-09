import { useState, useEffect } from "react";
import useInnerWidth from "./useInnerWidth";

const useSlideViews = () => {
  const width = useInnerWidth();
  const [slide, setSlide] = useState(6);

  useEffect(() => {
    if (width > 1200) {
      setSlide(6);
    } else if (width > 1024) {
      setSlide(5);
    } else if (width > 768) {
      setSlide(4);
    } else if (width > 500) {
      setSlide(3);
    } else {
      setSlide(2);
    }
  }, [width]);

  return slide;
};

export default useSlideViews;
