import React, { createContext } from "react";

const defaultValue = {
  theme: "light",
};

interface ThemeContextProviderProps {
  children: React.ReactNode;
}

export const ThemeContext = createContext(defaultValue);
