import { useIsLargerThanTabletSize } from "@/hooks/useIsLargerThanTabletSize";

export const useHeaderSize = () => {
  const isLargerThanTabletSize = useIsLargerThanTabletSize();

  const headerSize = isLargerThanTabletSize ? "6.25rem" : "5rem";

  const statusHeadingButtonHeight = "4.5rem";

  return { headerSize, statusHeadingButtonHeight };
};
