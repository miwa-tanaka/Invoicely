import { useTheme } from "@chakra-ui/react";
import { css } from "@emotion/react";
import ButtonBase from "@/components/atoms/buttonBase";

export type deleteModalButtonProps = { onClick: () => void };

export default function DeleteModalButton({
  onClick,
}: deleteModalButtonProps): JSX.Element {
  const { style } = useDeleteModalButtonStyles();

  return <ButtonBase text="Delete" onClick={onClick} style={style} />;
}

export const useDeleteModalButtonStyles = () => {
  const { colors, space } = useTheme();

  return {
    style: css`
      padding: 0 ${space[7]};
      background-color: ${colors.red[1]};
      color: white;
      transition: 0.2s ease;
      cursor: pointer;

      &:hover {
        background-color: ${colors.red[2]};
      }
    `,
  };
};
