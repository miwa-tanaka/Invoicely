import { useMediaQuery, useTheme } from "@chakra-ui/react";

export const useIsLargerThanPhoneSize = () => {
  const { breakpoints } = useTheme();
  const [isLargerThanTabletSize] = useMediaQuery(
    `(min-width: ${breakpoints["sm"]})`,
  );

  return isLargerThanTabletSize;
};
