import Link from "next/link";
import React, { useEffect } from "react";
import Sidebar from "../Sidebar";
import { SearchIcon } from "@heroicons/react/solid";

const Header = () => {
  useEffect(() => {
    const header = document.getElementById("myHeader");
    const sticky = header?.offsetTop || 0;

    const handleSticky = () => {
      if (window.pageYOffset > sticky) {
        header?.classList.add("sticky");
      } else {
        header?.classList.remove("sticky");
      }
    };

    window.addEventListener("scroll", handleSticky);

    return () => {
      window.removeEventListener("scroll", handleSticky);
    };
  }, []);

  return (
    <div id="myHeader" className={`py-4 shadow-sm bg-primary-200 transition`}>
      <div className="container flex items-center justify-between">
        <Link href="/">
          <a className="block">
            <h1 className="text-2xl font-bold text-text-color">NextComics</h1>
          </a>
        </Link>

        <Sidebar />

        <div className="flex items-center">
          <button className="p-2 rounded-full bg-primary-300 mr-4">
            <Link href="/tim-truyen-nang-cao">
              <a>
                <SearchIcon className="w-6 h-6 text-text-color" />
              </a>
            </Link>
          </button>
          <button className="text-text-color px-3 py-2 bg-primary-300 rounded-sm">
            Đăng nhập
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
