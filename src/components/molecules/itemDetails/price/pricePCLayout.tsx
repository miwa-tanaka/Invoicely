import {
  Table,
  Thead,
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

export default function PricePCLayout({
  items,
  total,
}: priceProps): JSX.Element {
  const { wrapper, table, footer } = usePriceStyles();
  const { header, body } = usePricePCLayoutStyles();

  return (
    <TableContainer w="full" css={wrapper}>
      <Table css={table}>
        <Thead css={header}>
          <Tr>
            <Th style={{ width: "40%" }}>Item Name</Th>
            <Th isNumeric style={{ width: "13%" }}>
              QTY.
            </Th>
            <Th isNumeric>Price</Th>
            <Th isNumeric>Total</Th>
          </Tr>
        </Thead>
        <Tbody css={body}>
          {items.map((v, k) => (
            <Tr key={k}>
              <Td>{v.name}</Td>
              <Td isNumeric>{v.quantity}</Td>
              <Td isNumeric>£ {v.price.toFixed(2)}</Td>
              <Td isNumeric>£ {v.total.toFixed(2)}</Td>
            </Tr>
          ))}
        </Tbody>
        <Tfoot css={footer}>
          <Tr>
            <Th colSpan={2}>Amount Due</Th>
            <Th isNumeric colSpan={2}>
              £ {total.toFixed(2)}
            </Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
}

export const usePricePCLayoutStyles = () => {
  const { colors, radii, space } = useTheme();
  const { colorMode } = useColorMode();

  return {
    header: css`
      th {
        border-color: transparent;
        text-transform: none;
        color: ${colorMode === "light" ? colors.gray[10] : colors.gray[1]};
        font-weight: 500;
        padding-top: ${space[8]};
        padding-inline-start: ${space[4]};
        padding-inline-end: ${space[4]};

        &:first-of-type,
        &:last-of-type {
          border-radius: 0 ${radii["md"]} 0 0;
        }
      }
    `,
    body: css`
      td {
        border-color: transparent;
        font-weight: 700;
        color: ${colorMode === "light" ? colors.gray[10] : "white"};
        white-space: normal;
        word-break: break-word;
        padding-inline-start: ${space[4]};
        padding-inline-end: ${space[4]};

        &:first-of-type,
        &:last-of-type {
          color: ${colorMode === "light" ? colors.black[1] : "white"};
        }
      }
    `,
  };
};
