import React, { FC } from "react";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  return (
    <div>
      <Header />
      <Sidebar />

      <div className="bg-red-500">
        <div className={`container`}>
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
