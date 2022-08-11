import React, { FC } from "react";
import Footer from "../Footer";
import Header from "../Header/Header";
import Sidebar from "../Sidebar";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  return (
    <div>
      <Header />

      <div className="bg-primary-200 pb-10">
        <div className={`min-h-screen mt-[-1px]`}>
          <div>{children}</div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MainLayout;
