import NextLink from "next/link";
import { Link, Box, useTheme, useColorMode } from "@chakra-ui/react";
import { css } from "@emotion/react";
import type { dataType } from "@/data/dataType";
import StatusBadge from "@/components/atoms/statusBadge";
import ArrowRightIcon from "@/components/atoms/icons/arrowRightIcon";

type itemPCLayoutProps = Pick<
  dataType,
  "id" | "createdAt" | "clientName" | "total" | "status"
>;

export default function ItemPCLayout({
  id,
  createdAt,
  clientName,
  total,
  status,
}: itemPCLayoutProps): JSX.Element {
  const { wrapper, idWrapper, date, name, price } = useItemPCLayoutStyles();

  return (
    <Link as={NextLink} href={`/${id}`} passHref py={4} px={8} css={wrapper}>
      <Box css={idWrapper}>
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

export const useItemPCLayoutStyles = () => {
  const { colors, radii, space } = useTheme();
  const { colorMode } = useColorMode();

  const fontColorBlackAndWhite =
    colorMode === "light" ? colors.black[2] : "white";
  const fontColorGrayAndWhite =
    colorMode === "light" ? colors.gray[3] : "white";

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
      color: ${fontColorBlackAndWhite};

      .hashtag {
        color: ${colors.gray[3]};
      }
    `,
    date: css`
      width: 18%;
      color: ${fontColorGrayAndWhite};
    `,
    name: css`
      width: 18%;
      color: ${fontColorGrayAndWhite};
    `,
    price: css`
      width: 18%;
      padding-right: ${space[4]};
      font-weight: 700;
      color: ${fontColorBlackAndWhite};
      text-align: right;

      .currencySymbol {
        padding-right: ${space[1]};
      }
    `,
  };
};
