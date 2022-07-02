import React from "react";
import { SearchIcon } from "@heroicons/react/solid";

const Search = () => {
  return (
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
  );
};

export default Search;
