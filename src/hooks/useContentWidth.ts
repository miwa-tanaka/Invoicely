import { useTheme } from "@chakra-ui/react";
import { useHeaderSize } from "./useHeaderSize";
import { useIsLargerThanTabletSize } from "@/hooks/useIsLargerThanTabletSize";

export const useContentHeight = () => {
  const { space } = useTheme();
  const { headerSize } = useHeaderSize();
  const isLargerThanTabletSize = useIsLargerThanTabletSize();

  const contentHeaderHeight = "5rem";
  const contentMarginTop = isLargerThanTabletSize ? space[16] : space[14];
  const contentHeight = isLargerThanTabletSize
    ? `calc(100svh - ${contentHeaderHeight} - ${contentMarginTop})`
    : `calc(100svh - ${headerSize} - ${contentHeaderHeight} - ${contentMarginTop})`;
  return { contentHeaderHeight, contentMarginTop, contentHeight };
};
