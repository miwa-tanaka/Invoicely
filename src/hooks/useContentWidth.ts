import { useTheme } from "@chakra-ui/react";
import { useHeaderSize } from "./useHeaderSize";
import { useIsLargerThanTabletSize } from "@/hooks/useIsLargerThanTabletSize";
import { useIsLargerThanPhoneSize } from "@/hooks/useIsLargerThanPhoneSize";

export const useContentHeight = () => {
  const { space } = useTheme();
  const { headerSize } = useHeaderSize();
  const isLargerThanTabletSize = useIsLargerThanTabletSize();
  const isLargerThanPhoneSize = useIsLargerThanPhoneSize();
  const contentHeaderHeight = "5rem";
  const contentMarginTop = isLargerThanTabletSize
    ? space[16]
    : isLargerThanPhoneSize
    ? space[10]
    : space[8];
  const contentHeight = isLargerThanTabletSize
    ? `calc(100svh - ${contentHeaderHeight} - ${contentMarginTop})`
    : `calc(100svh - ${headerSize} - ${contentHeaderHeight} - ${contentMarginTop})`;
  return { contentHeaderHeight, contentMarginTop, contentHeight };
};
