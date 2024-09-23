import { useTheme } from "@chakra-ui/react";

export const useContentHeight = () => {
  const { space } = useTheme();

  const headerHeight = "5rem";
  const marginTop = space[16];
  const contentHeight = `calc(100svh - ${headerHeight} - ${marginTop})`;

  return { headerHeight, marginTop, contentHeight };
};
