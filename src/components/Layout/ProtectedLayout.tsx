import { useRouter } from "next/router";
import React, { FC, useEffect } from "react";
import useStore from "../../zustand";
import { BarWave } from "react-cssfx-loading";

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

  if (typeof currentUser === "undefined") {
    return (
      <div className="flex items-center justify-center bg-primary-100 fixed top-0 bottom-0 right-0 left-0">
        <BarWave />
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedLayout;
