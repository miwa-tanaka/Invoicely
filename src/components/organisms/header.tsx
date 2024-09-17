import { Box, Flex, useTheme } from "@chakra-ui/react";
import { css } from "@emotion/react";
import Logo from "@/components/atoms/logo";
import ThemeChangeButton from "@/components/atoms/themeChangeButton";

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
          <img
            src="/images/image-avatar.jpg"
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

  return {
    wrapper: css`
      flex-direction: column;
      justify-content: space-between;
      width: 100px;
      height: 100svh;
      background-color: ${colors.navy[1]};
      border-radius: 0 ${radii["2xl"]} ${radii["2xl"]} 0;

      @media screen and (max-width: ${breakpoints["md"]}) {
        width: 100%;
        height: 80px;
        flex-direction: row;
        border-radius: 0;
      }
    `,
    logoWrapper: css`
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
      margin-bottom: ${space[6]};

      @media screen and (max-width: ${breakpoints["md"]}) {
        align-items: center;
        flex-direction: row;
        margin-right: ${space[6]};
        margin-bottom: 0;
        width: 100%;
      }
    `,
    userWrapper: css`
      padding: ${space[6]} 0;
      border-top: 1px solid ${colors.gray[4]};
      align-items: center;
      justify-content: center;

      @media screen and (max-width: ${breakpoints["md"]}) {
        padding: 0 ${space[6]};
        border-top: none;
        border-left: 1px solid ${colors.gray[4]};
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
