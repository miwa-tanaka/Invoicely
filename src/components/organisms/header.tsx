import Image from "next/image";
import { Box, Flex, useTheme } from "@chakra-ui/react";
import { css } from "@emotion/react";
import Logo from "@/components/atoms/logo";
import ThemeChangeButton from "@/components/atoms/themeChangeButton";
import { useHeaderSize } from "@/hooks/useHeaderSize";

export default function Header(): JSX.Element {
  const { wrapper, logoWrapper, userWrapper, user } = HeaderStyles();

  return (
    <Flex as="header" css={wrapper}>
      <Flex css={logoWrapper}>
        <Logo />
        <ThemeChangeButton />
      </Flex>
      <Flex css={userWrapper}>
        <Box css={user}>
          <Image
            src="/Invoicely/images/image-avatar.jpg"
            alt="headshot: John Doe"
            width={40}
            height={40}
          />
        </Box>
      </Flex>
    </Flex>
  );
}

export const HeaderStyles = () => {
  const { colors, radii, space, breakpoints } = useTheme();
  const { headerSize } = useHeaderSize();

  return {
    wrapper: css`
      width: 100%;
      height: ${headerSize};
      flex-direction: row;
      justify-content: space-between;
      background-color: ${colors.navy[1]};
      border-radius: 0;
      z-index: 9999;

      @media screen and (min-width: ${breakpoints["md"]}) {
        width: ${headerSize};
        height: 100svh;
        flex-direction: column;
        border-radius: 0 ${radii["2xl"]} ${radii["2xl"]} 0;
      }
    `,
    logoWrapper: css`
      width: 100%;
      height: 100%;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      margin-right: ${space[6]};
      margin-bottom: 0;

      @media screen and (min-width: ${breakpoints["md"]}) {
        flex-direction: column;
        margin-right: 0;
        margin-bottom: ${space[6]};
      }
    `,
    userWrapper: css`
      align-items: center;
      justify-content: center;
      padding: 0 ${space[6]};
      border-top: none;
      border-left: 1px solid ${colors.gray[4]};

      @media screen and (min-width: ${breakpoints["md"]}) {
        padding: ${space[6]} 0;
        border-top: 1px solid ${colors.gray[4]};
        border-left: none;
      }
    `,
    user: css`
      width: 40px;
      height: 40px;
      border-radius: ${radii["full"]};
      overflow: hidden;
    `,
  };
};
