import Image from "next/image";
import { Flex, Heading, Text, useTheme, useColorMode } from "@chakra-ui/react";
import { css } from "@emotion/react";
import { useContentHeight } from "@/hooks/useContentWidth";

export default function EmptyContents(): JSX.Element {
  const { heading, text } = useEmptyContentsStyles();
  const { contentHeight } = useContentHeight();

  return (
    <Flex direction="column" justify="center" align="center" h={contentHeight}>
      <Image src="/images/empty-illust.png" alt="" width={241} height={200} />
      <Heading as="h2" mt={16} mb={6} fontSize="2xl" css={heading}>
        There is nothing here
      </Heading>
      <Text css={text}>
        Create an invoice by clicking the
        <br />
        <Text as="span" fontWeight={700}>
          {" "}
          New Invoice{" "}
        </Text>
        button and get started
      </Text>
    </Flex>
  );
}

export const useEmptyContentsStyles = () => {
  const { colors } = useTheme();
  const { colorMode } = useColorMode();

  return {
    heading: css`
      font-family: unset;
      color: ${colorMode === "light" ? colors.black[1] : colors.white[1]};
    `,
    text: css`
      color: ${colorMode === "light" ? colors.gray[2] : colors.white[1]};
      text-align: center;
    `,
  };
};
