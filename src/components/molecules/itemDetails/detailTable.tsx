import { Box, Text, Flex, useTheme, useColorMode } from "@chakra-ui/react";
import { css } from "@emotion/react";
import type { dataType } from "@/data/dataType";

export type detailTableProps = Pick<
  dataType,
  | "id"
  | "createdAt"
  | "paymentDue"
  | "description"
  | "clientName"
  | "clientEmail"
  | "senderAddress"
  | "clientAddress"
>;

export default function DetailTable({
  id,
  createdAt,
  paymentDue,
  description,
  clientName,
  clientEmail,
  senderAddress,
  clientAddress,
}: detailTableProps): JSX.Element {
  const { colors } = useTheme();
  const { dark, desc, title, address, dates, bills } = useDetailTableStyles();

  return (
    <Flex w="full" align="center" direction="column" gap={6}>
      <Flex w="full" justify="space-between" wrap="wrap">
        <Box>
          <Text css={dark}>
            <Text as="span" color={colors.gray[8]}>
              #
            </Text>
            {id}
          </Text>
          <Text css={desc}>{description}</Text>
        </Box>
        <Box css={address}>
          <Text>{senderAddress.street}</Text>
          <Text>{senderAddress.city}</Text>
          <Text>{senderAddress.postCode}</Text>
          <Text>{senderAddress.country}</Text>
        </Box>
      </Flex>
      <Flex css={dates}>
        <Flex direction="column" gap={8}>
          <Box>
            <Text css={title}>Invoice Date</Text>
            <Text css={dark}>{createdAt}</Text>
          </Box>
          <Box>
            <Text css={title}>Payment Due</Text>
            <Text css={dark}>{paymentDue}</Text>
          </Box>
        </Flex>
        <Box css={bills}>
          <Text css={title}>Bill To</Text>
          <Text css={dark} paddingBottom={2}>
            {clientName}
          </Text>
          <Text>{clientAddress.street}</Text>
          <Text>{clientAddress.city}</Text>
          <Text>{clientAddress.postCode}</Text>
          <Text>{clientAddress.country}</Text>
        </Box>
        <Box>
          <Text css={title}>Sent to</Text>
          <Text css={dark}>{clientEmail}</Text>
        </Box>
      </Flex>
    </Flex>
  );
}

export const useDetailTableStyles = () => {
  const { colors, space, breakpoints } = useTheme();
  const { colorMode } = useColorMode();

  const fontColorGrayAndWhite =
    colorMode === "light" ? colors.gray[10] : "white";

  return {
    dark: css`
      color: ${colorMode === "light" ? colors.black[1] : "white"};
      font-weight: 700;
    `,
    desc: css`
      padding-top: ${space[2]};
      color: ${fontColorGrayAndWhite};
      font-weight: 500;
    `,
    title: css`
      font-weight: 500;
      color: ${fontColorGrayAndWhite};
      padding-bottom: ${space[3]};
    `,
    address: css`
      margin-top: ${space[8]};
      font-weight: 500;
      text-align: left;
      width: 100%;
      color: ${fontColorGrayAndWhite};

      @media screen and (min-width: ${breakpoints["sm"]}) {
        margin-top: 0;
        text-align: right;
        width: fit-content;
      }
    `,
    dates: css`
      width: 100%;
      flex-wrap: wrap;
      gap: ${space[8]} ${space[14]};

      @media screen and (min-width: ${breakpoints["sm"]}) {
        gap: ${space[28]};
      }
    `,
    bills: css`
      color: ${fontColorGrayAndWhite};
    `,
  };
};
