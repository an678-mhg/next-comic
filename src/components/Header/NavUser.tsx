import React, { FC } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";

interface NavUserProps {
  currentUser: any;
}

const NavUser: FC<NavUserProps> = ({ currentUser }) => {
  return (
    <ul className="bg-[#333] rounded-md p-2">
      <li className="text-text-color font-semibold py-1 px-2 mb-2 flex items-center">
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <img src={currentUser.photoURL} alt={currentUser.displayName} />
        </div>
        <div className="ml-3">
          <p className="font-normal">{currentUser.displayName}</p>
          <p className="text-sm text-gray-500">User</p>
        </div>
      </li>
      <li className="text-text-color font-semibold py-1 px-2">
        <button
          onClick={() => signOut(auth)}
          className="bg-blue-500 px-2 py-1 w-full rounded-md"
        >
          Đăng xuất
        </button>
      </li>
    </ul>
  );
};

export default NavUser;
