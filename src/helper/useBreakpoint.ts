import useBreakpoint from "use-breakpoint";

const BREAKPOINTS = { mobile: 0, tablet: 768, desktop: 1280 };

export function WindowSize() {
  const { breakpoint, maxWidth, minWidth } = useBreakpoint(BREAKPOINTS);
  let isMobile,
    isTablet,
    isDesktop = false;
  breakpoint === "mobile" ? (isMobile = true) : (isMobile = false);
  breakpoint === "tablet" ? (isTablet = true) : (isTablet = false);
  breakpoint === "desktop" ? (isDesktop = true) : (isDesktop = false);
  return { isMobile, isTablet, isDesktop };
}
