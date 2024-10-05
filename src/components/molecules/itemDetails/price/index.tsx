import { useTheme, useColorMode } from "@chakra-ui/react";
import { css } from "@emotion/react";
import type { dataType } from "@/data/dataType";
import { useIsLargerThanPhoneSize } from "@/hooks/useIsLargerThanPhoneSize";
import PricePCLayout from "@/components/molecules/itemDetails/price/pricePCLayout";
import PriceSPLayout from "@/components/molecules/itemDetails/price/priceSPLayout";

export type priceProps = Pick<dataType, "items" | "total">;

export default function Price({ items, total }: priceProps): JSX.Element {
  const isLargerThanPhoneSize = useIsLargerThanPhoneSize();

  return isLargerThanPhoneSize ? (
    <PricePCLayout items={items} total={total} />
  ) : (
    <PriceSPLayout items={items} total={total} />
  );
}

export const usePriceStyles = () => {
  const { colors, radii, space, fontSizes } = useTheme();
  const { colorMode } = useColorMode();

  return {
    wrapper: css`
      border-radius: ${radii["md"]};
      background-color: ${colorMode === "light"
        ? colors.white[2]
        : colors.navy[2]};
      font-family: unset;
    `,
    footer: css`
      background-color: ${colorMode === "light"
        ? colors.gray[5]
        : colors.black[1]};

      th {
        padding: ${space[8]};
        border-color: transparent;
        color: white;

        &:first-of-type {
          border-radius: 0 0 0 ${radii["md"]};
          text-transform: none;
          font-weight: 500;
        }
        &:nth-of-type(2) {
          font-size: ${fontSizes["xl"]};
          border-radius: 0 0 ${radii["md"]} 0;
        }
      }
    `,
  };
};
