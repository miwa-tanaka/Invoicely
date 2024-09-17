import { css } from "@emotion/react";
import { Box, useTheme } from "@chakra-ui/react";

export default function Logo(): JSX.Element {
  const { wrapper } = LogoStyles();

  return (
    <Box css={wrapper} aria-label="logo: Invoicely">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100"
        height="100"
        viewBox="0 0 28 26"
      >
        <path
          fill="#FFF"
          fillRule="evenodd"
          d="M20.513 0C24.965 2.309 28 6.91 28 12.21 28 19.826 21.732 26 14 26S0 19.826 0 12.21C0 6.91 3.035 2.309 7.487 0L14 12.9z"
          role="img"
          aria-hidden={true}
        />
      </svg>
    </Box>
  );
}

export const LogoStyles = () => {
  const { colors, radii, breakpoints } = useTheme();

  return {
    wrapper: css`
      position: relative;
      width: 100px;
      height: 100px;
      overflow: hidden;
      background-color: ${colors.purple[1]};
      border-radius: 0 ${radii["2xl"]} ${radii["2xl"]} 0;

      @media screen and (max-width: ${breakpoints["md"]}) {
        width: 80px;
        height: 80px;
      }

      &::before {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 50%;
        content: "";
        background-color: ${colors.purple[1]};
        border-radius: 0 ${radii["2xl"]} ${radii["2xl"]} 0;
      }

      &::after {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 50%;
        content: "";
        background-color: ${colors.purple[2]};
        border-radius: ${radii["2xl"]} 0 0 0;
      }

      svg {
        position: absolute;
        top: 50%;
        left: 50%;
        z-index: 1;
        width: 40%;
        height: 40%;
        transform: translate(-50%, -50%);
      }
    `,
  };
};
