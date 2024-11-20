import {
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useTheme,
  useColorMode,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { css } from "@emotion/react";
import type { dataType } from "@/data/dataType";
import ButtonBase from "@/components/atoms/buttonBase";

export type deleteModalProps = {
  id: dataType["id"];
  isOpen: boolean;
  onClose: () => void;
};

export default function DeleteModal({
  id,
  isOpen,
  onClose,
}: deleteModalProps): JSX.Element {
  const {
    contentWrapper,
    modalHeader,
    modalBody,
    modalFooter,
    deleteButton,
    cancelButton,
  } = useDeleteModalStyles();
  const router = useRouter();

  const deleteItem = () => {
    const storedData = localStorage.getItem("invoices");
    if (storedData) {
      const invoices: dataType[] = JSON.parse(storedData);
      const updatedInvoices = invoices.filter((invoice) => invoice.id !== id);
      localStorage.setItem("invoices", JSON.stringify(updatedInvoices));
    }
    router.push("/");
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      size={{ base: "xs", sm: "md" }}
    >
      <ModalOverlay />
      <ModalContent css={contentWrapper}>
        <ModalHeader css={modalHeader}>Confirm Deletion</ModalHeader>
        <ModalBody css={modalBody}>
          <Text>Are you sure you want to delete invoice #{id}?</Text>
          <Text>This action cannot be undone.</Text>
        </ModalBody>
        <ModalFooter css={modalFooter}>
          <ButtonBase text="Cancel" onClick={onClose} style={cancelButton} />
          <ButtonBase text="Delete" onClick={deleteItem} style={deleteButton} />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export const useDeleteModalStyles = () => {
  const { colors, space, fontSizes, breakpoints } = useTheme();
  const { colorMode } = useColorMode();

  return {
    contentWrapper: css`
      background-color: ${colorMode === "light" ? "white" : colors.navy[1]};
    `,
    modalHeader: css`
      padding: ${space[8]} ${space[8]} ${space[2]} ${space[8]};
      font-size: ${fontSizes["2xl"]};
      color: ${colorMode === "light" ? colors.black[1] : "white"};

      @media screen and (min-width: ${breakpoints["sm"]}) {
        padding: ${space[12]} ${space[12]} ${space[2]} ${space[12]};
      }
    `,
    modalBody: css`
      padding: ${space[3]} ${space[8]};
      color: ${colorMode === "light" ? colors.gray[9] : colors.gray[1]};

      @media screen and (min-width: ${breakpoints["sm"]}) {
        padding: ${space[3]} ${space[12]};
      }
    `,
    modalFooter: css`
      gap: ${space[6]};
      padding: ${space[3]} ${space[8]} ${space[8]} ${space[8]};

      @media screen and (min-width: ${breakpoints["sm"]}) {
        gap: ${space[2]};
        padding: ${space[3]} ${space[12]} ${space[12]} ${space[12]};
      }
    `,
    deleteButton: css`
      padding: 0 ${space[7]};
      background-color: ${colors.red[3]};
      color: white;
      transition: 0.2s ease;
      cursor: pointer;

      &:hover {
        background-color: ${colors.red[4]};
      }
    `,
    cancelButton: css`
      background-color: ${colorMode === "light"
        ? colors.white[2]
        : colors.navy[2]};
      color: ${colorMode === "light" ? colors.gray[10] : colors.gray[1]};

      &:hover {
        background-color: ${colorMode === "light" ? colors.gray[1] : "white"};
      }
    `,
  };
};
