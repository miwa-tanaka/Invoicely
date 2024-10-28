import ButtonBase from "@/components/atoms/buttonBase";
import { useDiscardButtonStyles } from "@/components/molecules/actionButtons/discardButton";

export type cancelButtonProps = {
  onClick: () => void;
  state: "new" | "edit";
};

export default function CancelButton({
  onClick,
  state,
}: cancelButtonProps): JSX.Element {
  const { discardButton } = useDiscardButtonStyles();

  return (
    <>
      {state !== "new" && (
        <ButtonBase
          text="Cancel"
          onClick={onClick}
          style={discardButton}
          aria-label="Cancel the editing"
        />
      )}
    </>
  );
}
