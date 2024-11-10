"use client";

import { useParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import type { dataType } from "@/data/dataType";
import { useDisclosure } from "@chakra-ui/react";
import ContentsWrapper from "@/components/templates/contentsWrapper";
import ItemDetails from "@/components/molecules/itemDetails";
import Drawer from "@/components/organisms/drawer";
import { useDrawer } from "@/context/drawerContext";
import StatusHeadingButtons from "@/components/molecules/itemDetails/statusHeadingButtons";
import { useIsLargerThanPhoneSize } from "@/hooks/useIsLargerThanPhoneSize";

const ItemDetailPage = () => {
  const { id } = useParams();
  const [item, setItem] = useState<dataType | undefined>();
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
      setItem(foundItem);
    }
  }, [id]);

  useEffect(() => {
    retrieveData();
  }, [retrieveData]);

  return (
    <>
      <ContentsWrapper>
        {item && (
          <>
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
          </>
        )}
      </ContentsWrapper>
      {item && !isLargerThanPhoneSize && (
        <StatusHeadingButtons
          status={item.status}
          id={item.id}
          onStatusUpdate={retrieveData}
          onDeleteModalOpen={onDeleteModalOpen}
        />
      )}
    </>
  );
};

export default ItemDetailPage;
