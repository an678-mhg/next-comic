import type { ReactNode } from "react";
import { useEffect, useState } from "react";

type IsBrowserProps = {
  children: ReactNode;
  skeleton?: ReactNode;
};

export const IsBrowser = ({ children, skeleton }: IsBrowserProps) => {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  if (!isBrowser) {
    return skeleton ? <>{skeleton}</> : <></>;
  }

  return <>{children}</>;
};
