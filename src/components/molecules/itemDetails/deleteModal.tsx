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
import { useDeleteModalButtonStyles } from "@/components/molecules/itemDetails/deleteModalButton";

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
  const { contentWrapper, modalHeader, modalBody, modalFooter, cancelButton } =
    useDeleteModalStyles();
  const { style } = useDeleteModalButtonStyles();
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
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent css={contentWrapper}>
        <ModalHeader css={modalHeader}>Confirm Deletion</ModalHeader>
        <ModalBody css={modalBody}>
          <Text>Are you sure you want to delete invoice #{id}?</Text>
          <Text>This action cannot be undone.</Text>
        </ModalBody>
        <ModalFooter css={modalFooter}>
          <ButtonBase text="Cancel" onClick={onClose} style={cancelButton} />
          <ButtonBase text="Delete" onClick={deleteItem} style={style} />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export const useDeleteModalStyles = () => {
  const { colors, space, fontSizes } = useTheme();
  const { colorMode } = useColorMode();

  return {
    contentWrapper: css`
      background-color: ${colorMode === "light" ? "white" : colors.navy[1]};
    `,
    modalHeader: css`
      padding: ${space[12]} ${space[12]} ${space[2]} ${space[12]};
      font-size: ${fontSizes["2xl"]};
      color: ${colorMode === "light" ? colors.black[1] : "white"};
    `,
    modalBody: css`
      padding: ${space[3]} ${space[12]};
      color: ${colorMode === "light" ? colors.gray[2] : colors.gray[1]};
    `,
    modalFooter: css`
      gap: ${space[2]};
      padding: ${space[3]} ${space[12]} ${space[12]} ${space[12]};
    `,
    cancelButton: css`
      background-color: ${colorMode === "light"
        ? colors.white[2]
        : colors.navy[2]};
      color: ${colorMode === "light" ? colors.gray[3] : colors.gray[1]};

      &:hover {
        background-color: ${colorMode === "light" ? colors.gray[1] : "white"};
      }
    `,
  };
};
