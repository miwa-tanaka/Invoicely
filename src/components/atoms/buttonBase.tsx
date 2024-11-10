import { css } from "@emotion/react";
import { Button, ButtonProps, useTheme } from "@chakra-ui/react";
import { Interpolation } from "@emotion/react";

export type ButtonBaseProps = {
  icon?: JSX.Element;
  text: string;
  style?: Interpolation<object>;
  type?: "submit" | "reset" | "button";
  onClick?: () => void;
} & ButtonProps;

export default function ButtonBase({
  icon,
  text,
  style,
  type,
  onClick,
  ...rest
}: ButtonBaseProps): JSX.Element {
  const { button } = ButtonBaseStyles();

  return (
    <Button
      type={type || "button"}
      leftIcon={icon ? icon : undefined}
      css={[button, style]}
      onClick={onClick}
      {...rest}
    >
      {text}
    </Button>
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
