import { useState, useEffect } from "react";
import useInnerWidth from "./useInnerWidth";

const useSlideViews = () => {
  const width = useInnerWidth();
  const [slide, setSlide] = useState(5);

  useEffect(() => {
    if (width > 1024) {
      setSlide(5);
    } else if (width > 768) {
      setSlide(3);
    } else if (width > 500) {
      setSlide(2);
    } else {
      setSlide(2);
    }
  }, [width]);

  return slide;
};

export default useSlideViews;
