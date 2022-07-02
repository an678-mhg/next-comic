import Link from "next/link";
import React from "react";
import { sidebar } from "../data/sidebar";

const Sidebar = () => {
  return (
    <div className={`bg-primary-300`}>
      <div className="container">
        <ul className="text-text-color flex items-center w-full justify-center">
          {sidebar.map((item) => (
            <li
              key={item.name}
              className={`py-2 px-5 hover:bg-primary-100 transition-colors`}
            >
              <Link href={item.link}>
                <a className="uppercase">{item.name}</a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
