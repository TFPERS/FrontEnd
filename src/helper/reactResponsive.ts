import { useMediaQuery } from "react-responsive";

export function WindowSize() {
  const isMobile = useMediaQuery({ query: "min-width: 1824px" });
  //   const isBigScreen = useMediaQuery({ query: "(min-width: 1824px)" });
  return { isMobile };
}
