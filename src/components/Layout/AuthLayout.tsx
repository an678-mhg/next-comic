import { onAuthStateChanged } from "firebase/auth";
import React, { FC, useEffect } from "react";
import useStore from "../../zustand";
import { auth } from "../../config/firebase";
import { BarWave } from "react-cssfx-loading";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  const { setCurrentUser, currentUser } = useStore();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        return;
      }

      setCurrentUser(null);
    });

    return () => unsub();
  }, []);

  if (typeof currentUser === "undefined") {
    return (
      <div className="flex items-center justify-center bg-primary-100 fixed top-0 bottom-0 right-0 left-0">
        <BarWave />
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthLayout;
