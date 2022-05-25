import { createContext, useContext } from "react";

export type HeadTitleContextType = {
  headTitle: string;
  setHeadTitle: (title: string) => void;
};

export const HeadTitleContext = createContext<HeadTitleContextType>({
  headTitle: "",
  setHeadTitle: (title) => console.warn("no head provider"),
});

export const useHeadTitle = () => useContext(HeadTitleContext);
