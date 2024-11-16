import { useTheme } from "@chakra-ui/react";
import { css } from "@emotion/react";
import ButtonBase from "@/components/atoms/buttonBase";

export type submitButtonProps = {
  onClick: () => void;
  state: "new" | "edit";
};

export default function SubmitButton({
  state,
  onClick,
}: submitButtonProps): JSX.Element {
  const { submitButton } = useSubmitButtonStyles();

  return (
    <ButtonBase
      text={state === "new" ? "Save & Send" : "Save Changes"}
      type="submit"
      style={submitButton}
      onClick={onClick}
    />
  );
}

export const useSubmitButtonStyles = () => {
  const { colors } = useTheme();

  return {
    submitButton: css`
      background-color: ${colors.purple[3]};
      font-weight: 700;
      color: white;

      &:hover {
        background-color: ${colors.purple[4]};
      }
    `,
  };
};
