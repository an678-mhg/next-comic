import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

export const getFollowing = async (uid: string) => {
  const results: any[] = [];

  const q = query(collection(db, "following"), where("uid", "==", uid));
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc: any) => {
    results.push({ ...doc.data(), id: doc.id });
  });

  return results;
};
