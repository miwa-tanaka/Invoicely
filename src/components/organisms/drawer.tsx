import {
  Drawer as ChakraDrawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  useTheme,
  useColorMode,
} from "@chakra-ui/react";
import { css } from "@emotion/react";
import { useHeaderSize } from "@/hooks/useHeaderSize";

export type DrawerProps = {
  title: string;
  isOpen: boolean;
  onOpen?: () => void;
  onClose: () => void;
};

export default function Drawer({
  title,
  isOpen,
  onOpen,
  onClose,
}: DrawerProps): JSX.Element {
  const { leftSpace, content } = useDrawerStyles();

  return (
    <ChakraDrawer placement="left" onClose={onClose} isOpen={isOpen} size="lg">
      <DrawerOverlay css={leftSpace} />
      <DrawerContent css={[leftSpace, content]}>
        <DrawerHeader>{title}</DrawerHeader>
        <DrawerBody></DrawerBody>
        <DrawerFooter></DrawerFooter>
      </DrawerContent>
    </ChakraDrawer>
  );
}

export const useDrawerStyles = () => {
  const { colors, radii } = useTheme();
  const { colorMode } = useColorMode();
  const { headerSize } = useHeaderSize();

  return {
    leftSpace: css`
      left: ${headerSize} !important;
    `,
    content: css`
      border-radius: 0 ${radii["2xl"]} ${radii["2xl"]} 0;
      background-color: ${colorMode === "light" ? "white" : colors.black[2]};
    `,
  };
};
