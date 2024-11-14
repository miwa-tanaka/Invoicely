import { useRouter } from "next/navigation";
import { Button, Box, useTheme, useColorMode } from "@chakra-ui/react";
import { css } from "@emotion/react";
import type { dataType } from "@/data/dataType";
import StatusBadge from "@/components/atoms/statusBadge";
import ArrowRightIcon from "@/components/atoms/icons/arrowRightIcon";
import { useItemDetail } from "@/hooks/useItemDetail";

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
  const { onOpen } = useItemDetail();
  const router = useRouter();

  const setPram = () => {
    router.push(`/?id=${id}`);
    onOpen();
  };

  return (
    <Button py={4} px={8} css={wrapper} onClick={setPram}>
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
    </Button>
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
      height: auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-radius: ${radii["md"]};
      background-color: ${colorMode === "light" ? "white" : colors.navy[1]};
      box-shadow: 0px 10px 10px -10px rgba(72, 84, 159, 0.1004);
      border: 1px solid transparent;
      white-space: normal;

      &:hover {
        border-color: ${colors.purple[1]};
        text-decoration: none;
        background-color: ${colorMode === "light" ? "white" : colors.navy[1]};
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
