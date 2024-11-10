import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { css } from "@emotion/react";
import { Box, Flex, useTheme, useColorMode } from "@chakra-ui/react";
import { useContentHeight } from "@/hooks/useContentWidth";
import { useHeaderSize } from "@/hooks/useHeaderSize";

type ContentsWrapperProps = {
  children: ReactNode;
};

export default function ContentsWrapper({
  children,
}: ContentsWrapperProps): JSX.Element {
  const { wrapper, topPageHeight, restPageHeight, content } =
    useContentsWrapperStyles();

  const pathname = usePathname();
  const currentHeight = pathname === "/" ? topPageHeight : restPageHeight;

  return (
    <Flex css={[wrapper, currentHeight]}>
      <Box css={content}>{children}</Box>
    </Flex>
  );
}

export const useContentsWrapperStyles = () => {
  const { colors, sizes, space, breakpoints } = useTheme();
  const { colorMode } = useColorMode();
  const { contentMarginTop } = useContentHeight();
  const { headerSize, statusHeadingButtonHeight } = useHeaderSize();

  return {
    wrapper: css`
      width: 100vw;
      justify-content: center;

      padding: 0 ${space[6]};
      background-color: ${colorMode === "light"
        ? colors.white[1]
        : colors.black[2]};

      @media screen and (min-width: ${breakpoints["sm"]}) {
        height: calc(100svh - ${headerSize});
      }

      @media screen and (min-width: ${breakpoints["md"]}) {
        width: calc(100vw - ${headerSize});
        height: 100svh;
      }
    `,
    topPageHeight: css`
      height: calc(100svh - ${headerSize});
    `,
    restPageHeight: css`
      height: calc(100svh - ${headerSize} - ${statusHeadingButtonHeight});
    `,

    content: css`
      width: ${sizes["3xl"]};
      margin-top: ${contentMarginTop};
    `,
  };
};
