import { Box, useTheme } from "@chakra-ui/react";
import { css } from "@emotion/react";
import ButtonBase from "@/components/atoms/buttonBase";
import PlusIcon from "@/components/atoms/icons/plusIcon";
import { useIsLargerThanPhoneSize } from "@/hooks/useIsLargerThanPhoneSize";

export type NewInvoiceButtonProps = {
  onClick?: () => void;
};

export default function NewInvoiceButton({
  onClick,
}: NewInvoiceButtonProps): JSX.Element {
  const { button, icon } = NewInvoiceButtonStyles();
  const isLargerThanPhoneSize = useIsLargerThanPhoneSize();

  const plusIconWithBg = (
    <Box css={icon}>
      <PlusIcon />
    </Box>
  );

  return (
    <ButtonBase
      text={isLargerThanPhoneSize ? "New Invoice" : "New"}
      icon={plusIconWithBg}
      style={button}
      onClick={onClick}
    />
  );
}

export const NewInvoiceButtonStyles = () => {
  const { colors, radii, space } = useTheme();

  return {
    button: css`
      background-color: ${colors.purple[1]};
      color: ${colors.white[1]};

      &:hover {
        background-color: ${colors.purple[2]};
      }
    `,

    icon: css`
      padding: ${space[2]};
      text-align: center;
      background-color: ${colors.white[1]};
      border-radius: ${radii["full"]};

      svg path {
        fill: ${colors.purple[1]};
      }
    `,
  };
};
