import Link from "next/link";
import React from "react";
import Search from "./Search";

const Header = () => {
  return (
    <div className={`py-4 shadow-sm bg-primary-200`}>
      <div className="container flex items-center justify-between">
        <Link href="/">
          <a className="block">
            <h1 className="text-2xl font-bold text-text-color">NextComics</h1>
          </a>
        </Link>

        <Search />

        <div>
          <button className="text-text-color px-3 py-2 bg-primary-300 rounded-sm">
            Đăng nhập
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
