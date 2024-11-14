import { useEffect, useState, useCallback } from "react";
import type { dataType } from "@/data/dataType";
import { Text, useDisclosure } from "@chakra-ui/react";
import ContentsWrapper from "@/components/templates/contentsWrapper";
import ItemDetails from "@/components/molecules/itemDetails";
import Drawer from "@/components/organisms/drawer";
import { useDrawer } from "@/hooks/useDrawer";
import StatusHeadingButtons from "@/components/molecules/itemDetails/statusHeadingButtons";
import { useIsLargerThanPhoneSize } from "@/hooks/useIsLargerThanPhoneSize";

type itemDetailProps = Pick<dataType, "id">;

export default function ItemDetail({ id }: itemDetailProps): JSX.Element {
  const [item, setItem] = useState<dataType | null>(null);
  const { isOpen, onClose } = useDrawer();
  const {
    isOpen: isDeleteModalOpen,
    onOpen: onDeleteModalOpen,
    onClose: onDeleteModalClose,
  } = useDisclosure();
  const isLargerThanPhoneSize = useIsLargerThanPhoneSize();

  const retrieveData = useCallback(() => {
    const storedData = localStorage.getItem("invoices");

    if (storedData) {
      const itemsData: dataType[] = JSON.parse(storedData);
      const foundItem = itemsData.find((invoice) => invoice.id === id);
      setItem(foundItem || null);
    }
  }, [id]);

  useEffect(() => {
    retrieveData();
  }, [retrieveData]);

  if (!item) {
    return <Text>Loading...</Text>;
  }

  return (
    <>
      <ContentsWrapper>
        <ItemDetails
          data={item}
          onStatusUpdate={retrieveData}
          isDeleteModalOpen={isDeleteModalOpen}
          onDeleteModalOpen={onDeleteModalOpen}
          onDeleteModalClose={onDeleteModalClose}
        />
        <Drawer
          state="edit"
          isOpen={isOpen}
          onClose={onClose}
          updateInvoices={retrieveData}
          id={item.id}
          data={item}
        />
      </ContentsWrapper>
      {!isLargerThanPhoneSize && (
        <StatusHeadingButtons
          status={item.status}
          id={item.id}
          onStatusUpdate={retrieveData}
          onDeleteModalOpen={onDeleteModalOpen}
        />
      )}
    </>
  );
}
