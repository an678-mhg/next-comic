import React from "react";
import { SearchIcon } from "@heroicons/react/solid";

const Header = () => {
  return (
    <div className={`py-4 shadow-sm bg-primary-200`}>
      <div className="container flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-color">NextComics</h1>
        </div>

        <div
          className={`bg-primary-300 flex items-center w-[300px] rounded-md overflow-hidden`}
        >
          <input
            className={`px-3 py-1 flex-1 bg-primary-300 text-text-color text-sm placeholder:text-text-color placeholder:text-sm`}
            placeholder="Tìm kiếm truyện...."
          />
          <button className="h-full px-3 py-2">
            <SearchIcon className="w-5 h-5 text-text-color" />
          </button>
        </div>

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
