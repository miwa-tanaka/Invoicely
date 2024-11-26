import React from "react";
import {
  Table,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer,
  useTheme,
  useColorMode,
} from "@chakra-ui/react";
import { css } from "@emotion/react";
import type { priceProps } from "@/components/molecules/itemDetails/price/index";
import { usePriceStyles } from "@/components/molecules/itemDetails/price/index";

export default function PriceSPLayout({
  items,
  total,
}: priceProps): JSX.Element {
  const { wrapper, table, footer } = usePriceStyles();
  const { body } = useItemSPLayoutStyles();

  return (
    <TableContainer w="full" css={wrapper}>
      <Table css={table}>
        <Tbody css={body}>
          {items.map((v, k) => (
            <React.Fragment key={k}>
              <Tr>
                <Td pb={1} w="35%">
                  {v.name}
                </Td>
                <Td isNumeric rowSpan={2}>
                  £ {v.total.toFixed(2)}
                </Td>
              </Tr>
              <Tr>
                <Td className="quantityPrice">
                  {v.quantity} x £ {v.price.toFixed(2)}
                </Td>
              </Tr>
            </React.Fragment>
          ))}
        </Tbody>
        <Tfoot css={footer}>
          <Tr>
            <Th w="35%">Amount Due</Th>
            <Th isNumeric>£ {total.toFixed(2)}</Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
}

export const useItemSPLayoutStyles = () => {
  const { colors, space } = useTheme();
  const { colorMode } = useColorMode();

  return {
    body: css`
      td {
        border-color: transparent;
        font-weight: 700;
        color: ${colorMode === "light" ? colors.black[1] : "white"};
        white-space: normal;
        word-break: break-word;
        padding-inline-start: ${space[4]};
        padding-inline-end: ${space[4]};
      }

      .quantityPrice {
        padding-top: ${space[1]};
        color: ${colorMode === "light" ? colors.gray[10] : colors.gray[2]};
      }
    `,
  };
};
