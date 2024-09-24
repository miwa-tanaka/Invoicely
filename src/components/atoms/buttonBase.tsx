import { css } from "@emotion/react";
import { Button, useTheme } from "@chakra-ui/react";
import { Interpolation } from "@emotion/react";

export type ButtonBaseProps = {
  icon?: JSX.Element;
  text: string;
  style?: Interpolation<object>;
};

export default function ButtonBase({
  icon,
  text,
  style,
}: ButtonBaseProps): JSX.Element {
  const { button } = ButtonBaseStyles();

  return (
    <>
      {icon ? (
        <Button leftIcon={icon} css={[button, style]}>
          {text}
        </Button>
      ) : (
        <Button css={[button, style]}>{text}</Button>
      )}
    </>
  );
}

export const ButtonBaseStyles = () => {
  const { radii, space } = useTheme();

  return {
    button: css`
      height: ${space[14]};
      display: flex;
      align-items: center;
      border-radius: ${radii["full"]};
    `,
  };
};
