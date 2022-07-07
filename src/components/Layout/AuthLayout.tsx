import { onAuthStateChanged } from "firebase/auth";
import React, { FC, useEffect } from "react";
import useStore from "../../zustand";
import followingStore from "../../zustand/following";
import { auth, db } from "../../config/firebase";
import { BarWave } from "react-cssfx-loading";
import { doc, setDoc } from "firebase/firestore";
import { async } from "@firebase/util";
import { getFollowing } from "../../shared/getComicFollowing";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  const { setCurrentUser, currentUser } = useStore();
  const { setFollow, setLoading } = followingStore();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user: any) => {
      if (user) {
        setCurrentUser(user);
        setLoading(true);
        setFollow(await getFollowing(user.uid));
        setLoading(false);
        setDoc(doc(db, `users/${user.uid}`), {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        });
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
