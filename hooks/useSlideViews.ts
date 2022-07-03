import { useState, useEffect } from "react";

const useSlideViews = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const [slide, setSlide] = useState(6);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (width > 1280) {
      setSlide(6);
    } else if (width < 1280 && width > 1024) {
      setSlide(5);
    } else if (width < 1024 && width > 768) {
      setSlide(4);
    } else if (width < 768 && width > 500) {
      setSlide(3);
    } else if (width < 500) {
      setSlide(2);
    }
  }, [width]);

  return slide;
};

export default useSlideViews;
