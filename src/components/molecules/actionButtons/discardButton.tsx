import { Flex, useTheme, useColorMode } from "@chakra-ui/react";
import { css } from "@emotion/react";
import ButtonBase from "@/components/atoms/buttonBase";

export type discardButtonProps = {
  onClick: () => void;
  state: "new" | "edit";
};

export default function DiscardButton({
  onClick,
  state,
}: discardButtonProps): JSX.Element {
  const { discardButton } = useDiscardButtonStyles();

  return (
    <>
      {state === "new" && (
        <Flex>
          <ButtonBase
            text="Discard"
            onClick={onClick}
            style={discardButton}
            aria-label="Discard changes"
          />
        </Flex>
      )}
    </>
  );
}

export const useDiscardButtonStyles = () => {
  const { colors } = useTheme();
  const { colorMode } = useColorMode();

  return {
    discardButton: css`
      background-color: ${colorMode === "light"
        ? colors.white[2]
        : colors.navy[2]};
      font-weight: 700;
      color: ${colorMode === "light" ? colors.gray[10] : colors.gray[1]};

      &:hover {
        background-color: ${colorMode === "light"
          ? colors.gray[1]
          : colors.navy[1]};
        color: ${colorMode === "light" ? colors.gray[10] : colors.gray[1]};
      }
    `,
  };
};
