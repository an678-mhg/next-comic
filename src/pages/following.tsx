import React from "react";
import MainLayout from "../components/Layout/MainLayout";
import ProtectedLayout from "../components/Layout/ProtectedLayout";

const Following = () => {
  return (
    <ProtectedLayout>
      <MainLayout>Hello</MainLayout>
    </ProtectedLayout>
  );
};

export default Following;
