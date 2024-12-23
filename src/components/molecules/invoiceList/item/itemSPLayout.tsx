import { useRouter } from "next/navigation";
import { Button, Box, Flex, useTheme, useColorMode } from "@chakra-ui/react";
import { css } from "@emotion/react";
import type { dataType } from "@/data/dataType";
import StatusBadge from "@/components/atoms/statusBadge";
import { useItemDetail } from "@/hooks/useItemDetail";

type itemSPLayoutProps = Pick<
  dataType,
  "id" | "createdAt" | "clientName" | "total" | "status"
>;

export default function ItemSPLayout({
  id,
  createdAt,
  clientName,
  total,
  status,
}: itemSPLayoutProps): JSX.Element {
  const { wrapper, idWrapper, date, name, price } = useItemSPLayoutStyles();
  const { onOpen } = useItemDetail();
  const router = useRouter();

  const setPram = () => {
    router.push(`/?id=${id}`);
    onOpen();
  };

  return (
    <Button css={wrapper} onClick={setPram}>
      <Flex w="full" align="center" justify="space-between">
        <Box css={idWrapper}>
          <Box as="span" className="hashtag">
            #
          </Box>
          {id}
        </Box>
        <Box css={name}>{clientName}</Box>
      </Flex>
      <Flex w="full" align="center" justify="space-between">
        <Flex flexDirection="column" gap={2} align="flex-start">
          <Box css={date}>Due {createdAt}</Box>
          <Box css={price}>
            <Box as="span" className="currencySymbol">
              £
            </Box>
            {total}
          </Box>
        </Flex>
        <StatusBadge status={status} />
      </Flex>
    </Button>
  );
}

export const useItemSPLayoutStyles = () => {
  const { colors, radii, space } = useTheme();
  const { colorMode } = useColorMode();

  const fontColorBlackAndWhite =
    colorMode === "light" ? colors.black[2] : "white";
  const fontColorGrayAndWhite =
    colorMode === "light" ? colors.gray[10] : "white";

  return {
    wrapper: css`
      height: auto;
      display: flex;
      flex-direction: column;
      gap: ${space[6]};
      padding: ${space[6]};
      border-radius: ${radii["md"]};
      background-color: ${colorMode === "light" ? "white" : colors.navy[1]};
      box-shadow: 0px 10px 10px -10px rgba(72, 84, 159, 0.1004);
      border: 1px solid transparent;

      &:hover {
        border-color: ${colors.purple[1]};
        text-decoration: none;
        background-color: ${colorMode === "light" ? "white" : colors.navy[1]};
      }
    `,
    idWrapper: css`
      font-weight: 700;
      color: ${fontColorBlackAndWhite};

      .hashtag {
        color: ${colors.gray[8]};
      }
    `,
    date: css`
      color: ${fontColorGrayAndWhite};
    `,
    name: css`
      color: ${fontColorGrayAndWhite};
      text-align: right;
    `,
    price: css`
      font-weight: 700;
      color: ${fontColorBlackAndWhite};

      .currencySymbol {
        padding-right: ${space[1]};
      }
    `,
  };
};
