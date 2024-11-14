import { useTheme, useColorMode } from "@chakra-ui/react";
import { css } from "@emotion/react";
import ButtonBase from "@/components/atoms/buttonBase";
import { useDrawer } from "@/hooks/useDrawer";

export type editButtonProps = object;

export default function EditButton({}: editButtonProps): JSX.Element {
  const { style } = useEditButtonStyles();
  const { onOpen } = useDrawer();

  return <ButtonBase text="Edit" onClick={onOpen} style={style} />;
}

export const useEditButtonStyles = () => {
  const { colors, space } = useTheme();
  const { colorMode } = useColorMode();

  return {
    style: css`
      padding: 0 ${space[7]};
      background-color: ${colorMode === "light"
        ? colors.white[2]
        : colors.navy[2]};
      color: ${colorMode === "light" ? colors.gray[3] : colors.gray[1]};
      transition: 0.2s ease;
      cursor: pointer;

      &:hover {
        background-color: ${colorMode === "light" ? colors.gray[1] : "white"};
      }
    `,
  };
};
