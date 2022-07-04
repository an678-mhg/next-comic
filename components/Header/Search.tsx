import React from "react";
import { SearchIcon } from "@heroicons/react/solid";

const Search = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm opacity-100 z-[9999] flex items-center justify-center">
      <div className="w-[400px] max-w-[calc(100%-32px)] bg-primary-200 h-[150px] px-3 flex justify-center items-center">
        <div
          className={`bg-primary-300 md:flex items-center w-full rounded-md overflow-hidden`}
        >
          <button className="h-full px-3 py-2">
            <SearchIcon className="w-5 h-5 text-text-color" />
          </button>
          <input
            className={`px-3 py-1 flex-1 bg-primary-300 text-text-color text-sm placeholder:text-text-color placeholder:text-sm`}
          />
        </div>
      </div>
    </div>
  );
};

export default Search;
