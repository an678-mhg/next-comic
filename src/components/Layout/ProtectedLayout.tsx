import { useRouter } from "next/router";
import React, { FC, useEffect } from "react";
import useStore from "../../zustand";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout: FC<ProtectedLayoutProps> = ({ children }) => {
  const { currentUser } = useStore();
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
      router.push(`/sign-in?redirect=${encodeURIComponent(router.asPath)}`);
    }
  }, [currentUser]);

  return <>{children}</>;
};

export default ProtectedLayout;
