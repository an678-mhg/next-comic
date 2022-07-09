import { onAuthStateChanged } from "firebase/auth";
import React, { FC, useEffect } from "react";
import useStore from "../../zustand";
import followingStore from "../../zustand/following";
import { auth, db } from "../../config/firebase";
import { doc, setDoc } from "firebase/firestore";
import { getFollowing } from "../../shared/getComicFollowing";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  const { setCurrentUser } = useStore();
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
      setFollow([]);
    });

    return () => unsub();
  }, []);

  return <>{children}</>;
};

export default AuthLayout;
