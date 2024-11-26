import { useTheme, useColorMode } from "@chakra-ui/react";
import { css } from "@emotion/react";
import ButtonBase from "@/components/atoms/buttonBase";

export type saveButtonProps = {
  onClick: () => void;
  state: "new" | "edit";
};

export default function SaveButton({
  state,
  onClick,
}: saveButtonProps): JSX.Element {
  const { saveButton } = useSaveButtonStyles();

  return (
    <>
      {state === "new" && (
        <ButtonBase text="Save as Draft" style={saveButton} onClick={onClick} />
      )}
    </>
  );
}

export const useSaveButtonStyles = () => {
  const { colors } = useTheme();
  const { colorMode } = useColorMode();

  return {
    saveButton: css`
      background-color: ${colors.gray[5]};
      font-weight: 700;
      color: ${colorMode === "light" ? colors.white[1] : colors.gray[1]};

      &:hover {
        background-color: ${colors.black[1]};
      }
    `,
  };
};
