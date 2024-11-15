import { useEffect, useState } from "react";
import type { dataType } from "@/data/dataType";
import { Flex, Heading, useDisclosure } from "@chakra-ui/react";
import ContentsWrapper from "@/components/templates/contentsWrapper";
import ItemDetails from "@/components/molecules/itemDetails";
import Drawer from "@/components/organisms/drawer";
import { useDrawer } from "@/hooks/useDrawer";
import StatusHeadingButtons from "@/components/molecules/itemDetails/statusHeadingButtons";
import { useIsLargerThanPhoneSize } from "@/hooks/useIsLargerThanPhoneSize";
import EmptyContents from "@/components/molecules/emptyContents";
import NewInvoiceButton from "@/components/molecules/newInvoiceButton";
import { useAllInvoiceListStyles } from "@/components/templates/allInvoiceList";
import { useInvoices } from "@/hooks/useInvoices";

type itemDetailProps = Pick<dataType, "id">;

export default function ItemDetail({ id }: itemDetailProps): JSX.Element {
  const [item, setItem] = useState<dataType | null>(null);
  const { isOpen, onOpen, onClose } = useDrawer();
  const {
    isOpen: isDeleteModalOpen,
    onOpen: onDeleteModalOpen,
    onClose: onDeleteModalClose,
  } = useDisclosure();
  const isLargerThanPhoneSize = useIsLargerThanPhoneSize();
  const { header, heading } = useAllInvoiceListStyles();
  const { invoices, loadInvoices } = useInvoices();

  useEffect(() => {
    loadInvoices();
  }, [loadInvoices]);

  useEffect(() => {
    if (invoices.length > 0) {
      const foundItem = invoices.find((invoice) => invoice.id === id);
      setItem(foundItem || null);
    }
  }, [invoices, id]);

  if (!item) {
    return (
      <ContentsWrapper>
        <Flex css={header}>
          <Flex direction="column">
            <Heading as="h1" size="xl" css={heading}>
              Invoices
            </Heading>
          </Flex>
          <Flex gap={8} align="center">
            <NewInvoiceButton onClick={onOpen} />
          </Flex>
        </Flex>
        <EmptyContents />
        <Drawer
          state="new"
          isOpen={isOpen}
          onClose={onClose}
          updateInvoices={loadInvoices}
        />
      </ContentsWrapper>
    );
  }

  return (
    <>
      <ContentsWrapper>
        <ItemDetails
          data={item}
          onStatusUpdate={loadInvoices}
          isDeleteModalOpen={isDeleteModalOpen}
          onDeleteModalOpen={onDeleteModalOpen}
          onDeleteModalClose={onDeleteModalClose}
        />
        <Drawer
          state="edit"
          isOpen={isOpen}
          onClose={onClose}
          updateInvoices={loadInvoices}
          id={item.id}
          data={item}
        />
      </ContentsWrapper>
      {!isLargerThanPhoneSize && (
        <StatusHeadingButtons
          status={item.status}
          id={item.id}
          onStatusUpdate={loadInvoices}
          onDeleteModalOpen={onDeleteModalOpen}
        />
      )}
    </>
  );
}
