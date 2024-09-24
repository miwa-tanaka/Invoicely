import { useMediaQuery, useTheme } from "@chakra-ui/react";

export const useIsLargerThanTabletSize = () => {
  const { breakpoints } = useTheme();
  const [isLargerThanTabletSize] = useMediaQuery(
    `(min-width: ${breakpoints["md"]})`,
  );

  return isLargerThanTabletSize;
};
