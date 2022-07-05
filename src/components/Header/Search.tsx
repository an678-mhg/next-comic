import { useRouter } from "next/router";
import React, { FC, useState } from "react";

interface SearchProps {
  handleClose: () => void;
}

const Search: FC<SearchProps> = ({ handleClose }) => {
  const [keyword, setKeyword] = useState("");

  const router = useRouter();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    router.push(`/search?keyword=${keyword}`);
    handleClose();
  };

  return (
    <div
      onClick={handleClose}
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm opacity-100 z-[9999] transition-opacity"
    >
      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className="bg-primary-200 w-[700px] max-w-[calc(100%-32px)] p-4 rounded-md mt-10 mx-auto"
      >
        <h1 className="font-semibold text-text-color text-2xl mb-4">
          Tìm truyện
        </h1>
        <input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="w-full py-2 px-4 bg-primary-300 rounded-md text-text-color"
          placeholder="Tìm kiếm truyện..."
        />
      </form>
    </div>
  );
};

export default Search;
