import { useState, useEffect } from "react";

const useInnerWidth = () => {
  const [width, setWidth] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth;
    }
    return null;
  });

  useEffect(() => {
    const handleResize = () => {
      setWidth(window?.innerWidth);
    };

    window?.addEventListener("resize", handleResize);

    return () => window?.removeEventListener("resize", handleResize);
  }, []);

  return width;
};

export default useInnerWidth;
