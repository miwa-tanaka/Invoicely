import NextLink from "next/link";
import { Link } from "@chakra-ui/react";
import { Box, useTheme, useColorMode } from "@chakra-ui/react";
import { css } from "@emotion/react";
import type { dataType } from "@/data/dataType";
import StatusBadge from "./statusBadge";
import ArrowRightIcon from "@/components/atoms/icons/arrowRightIcon";

type invoiceListItemProps = Pick<
  dataType,
  "id" | "createdAt" | "clientName" | "total" | "status"
>;

export default function InvoiceListItem({
  id,
  createdAt,
  clientName,
  total,
  status,
}: invoiceListItemProps): JSX.Element {
  const { wrapper, idWrapper, date, name, price } = useInvoiceListItemStyles();

  console.log(status, "status");

  return (
    <Link as={NextLink} href="/" py={4} px={8} css={wrapper}>
      <Box css={idWrapper} className="id">
        <Box as="span" className="hashtag">
          #
        </Box>
        {id}
      </Box>
      <Box css={date}>Due {createdAt}</Box>
      <Box css={name}>{clientName}</Box>
      <Box css={price}>
        <Box as="span" className="currencySymbol">
          £
        </Box>
        {total}
      </Box>
      <StatusBadge status={status} />
      <ArrowRightIcon />
    </Link>
  );
}

export const useInvoiceListItemStyles = () => {
  const { colors, radii, space } = useTheme();
  const { colorMode } = useColorMode();

  return {
    wrapper: css`
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-radius: ${radii["md"]};
      background-color: ${colorMode === "light" ? "white" : colors.navy[1]};
      box-shadow: 0px 10px 10px -10px rgba(72, 84, 159, 0.1004);
      border: 1px solid transparent;

      &:hover {
        border-color: ${colors.purple[1]};
        text-decoration: none;
      }
    `,
    idWrapper: css`
      width: 15%;
      font-weight: 700;
      color: ${colors.black[2]};

      .hashtag {
        color: ${colors.gray[3]};
      }
    `,
    date: css`
      width: 18%;
      color: ${colors.gray[3]};
    `,
    name: css`
      width: 18%;
      color: ${colors.gray[3]};
    `,
    price: css`
      width: 18%;
      padding-right: ${space[4]};
      font-weight: 700;
      color: ${colors.black[2]};
      text-align: right;

      .currencySymbol {
        padding-right: ${space[1]};
      }
    `,
  };
};
