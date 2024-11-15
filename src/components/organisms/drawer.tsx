import {
  Drawer as ChakraDrawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  useTheme,
  useColorMode,
} from "@chakra-ui/react";
import { css } from "@emotion/react";
import { useHeaderSize } from "@/hooks/useHeaderSize";
import Form from "@/components/organisms/form";
import type { dataType } from "@/data/dataType";

export type DrawerProps = {
  state: "new" | "edit";
  id?: string;
  isOpen: boolean;
  onOpen?: () => void;
  onClose: () => void;
  updateInvoices: () => void;
  data?: dataType;
};

export default function Drawer({
  state,
  id,
  isOpen,
  onClose,
  updateInvoices,
  data,
}: DrawerProps): JSX.Element {
  const { leftSpace, content, header } = useDrawerStyles();

  return (
    <ChakraDrawer placement="left" onClose={onClose} isOpen={isOpen} size="lg">
      <DrawerOverlay css={leftSpace} />
      <DrawerContent css={[leftSpace, content]}>
        <DrawerHeader fontSize="2xl" css={header}>
          {state === "new" ? "New Invoice" : `Edit #${id}`}
        </DrawerHeader>
        <DrawerBody p={0}>
          <Form
            invoiceId={id}
            defaultData={data}
            state={state}
            onClose={onClose}
            updateInvoices={updateInvoices}
          />
        </DrawerBody>
      </DrawerContent>
    </ChakraDrawer>
  );
}

export const useDrawerStyles = () => {
  const { space, colors, radii, breakpoints } = useTheme();
  const { colorMode } = useColorMode();
  const { headerSize } = useHeaderSize();

  return {
    leftSpace: css`
      left: 0 !important;

      @media screen and (min-width: ${breakpoints["md"]}) {
        left: ${headerSize} !important;
      }
    `,
    content: css`
      top: ${headerSize} !important;
      border-radius: 0 ${radii["2xl"]} ${radii["2xl"]} 0;
      background-color: ${colorMode === "light" ? "white" : colors.black[2]};

      @media screen and (min-width: ${breakpoints["md"]}) {
        top: 0 !important;
      }
    `,
    header: css`
      padding: ${space[4]} ${space[5]} 0 ${space[5]};

      @media screen and (min-width: ${breakpoints["sm"]}) {
        padding: ${space[6]} ${space[8]};
      }

      @media screen and (min-width: ${breakpoints["md"]}) {
        padding: ${space[8]};
      }
    `,
  };
};
