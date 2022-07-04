import Link from "next/link";
import React, { useState } from "react";
import Sidebar from "../Sidebar";
import { SearchIcon } from "@heroicons/react/solid";
import Search from "./Search";

const Header = () => {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <div className={`py-4 shadow-sm bg-primary-200`}>
      <div className="container flex items-center justify-between">
        <Link href="/">
          <a className="block">
            <h1 className="text-2xl font-bold text-text-color">NextComics</h1>
          </a>
        </Link>

        <Sidebar />

        <div className="flex items-center">
          <button
            onClick={() => setShowSearch(true)}
            className="p-2 rounded-full bg-primary-300 mr-4"
          >
            <SearchIcon className="w-6 h-6 text-text-color" />
          </button>
          <button className="text-text-color px-3 py-2 bg-primary-300 rounded-sm">
            Đăng nhập
          </button>
        </div>
      </div>

      {showSearch && <Search />}
    </div>
  );
};

export default Header;
