"use client";

import { useState, useEffect, useMemo } from "react";
import { css } from "@emotion/react";
import { Flex, Heading, Text, useTheme, useColorMode } from "@chakra-ui/react";
import FilterByStatusMenu from "@/components/organisms/filterByStatusMenu";
import NewInvoiceButton from "@/components/molecules/newInvoiceButton";
import InvoiceList from "@/components/molecules/invoiceList";
import EmptyContents from "@/components/molecules/emptyContents";
import type {
  dataType,
  idListType,
  jsonDataType,
  statusDataArray,
} from "@/data/dataType";
import { useContentHeight } from "@/hooks/useContentWidth";
import { useIsLargerThanPhoneSize } from "@/hooks/useIsLargerThanPhoneSize";
import ContentsWrapper from "@/components/templates/contentsWrapper";
import Drawer from "@/components/organisms/drawer";
import { useDrawer } from "@/context/drawerContext";

export default function Home() {
  const { header, text, heading } = useHomeStyles();
  const [storageInvoiceData, setStorageInvoiceData] = useState<jsonDataType>(
    [],
  );
  const [quantityOfData, setQuantityOfData] = useState<number>(0);
  const isLargerThanPhoneSize = useIsLargerThanPhoneSize();
  const [selectedStatuses, setSelectedStatuses] = useState<statusDataArray>([]);
  const { isOpen, onOpen, onClose } = useDrawer();

  const handleStatusChange = (newStatuses: statusDataArray) => {
    setSelectedStatuses(newStatuses);
  };

  const filteredInvoices = useMemo(() => {
    return storageInvoiceData.filter(
      (invoice) =>
        selectedStatuses.length === 0 ||
        selectedStatuses.includes(invoice.status),
    );
  }, [storageInvoiceData, selectedStatuses]);

  const loadInvoices = () => {
    const storedInvoices = localStorage.getItem("invoices");
    const parsedInvoices = storedInvoices ? JSON.parse(storedInvoices) : [];
    setStorageInvoiceData(parsedInvoices);

    // create a list of IDs
    const invoiceIds: idListType = parsedInvoices.map(
      (invoice: dataType) => invoice.id,
    );
    localStorage.setItem("invoiceIds", JSON.stringify(invoiceIds));

    setQuantityOfData(parsedInvoices.length);
  };

  useEffect(() => {
    loadInvoices();
  }, []);

  return (
    <ContentsWrapper>
      <Flex css={header}>
        <Flex direction="column">
          <Heading as="h1" size="xl" css={heading}>
            Invoices
          </Heading>
          <Text css={text}>
            {isLargerThanPhoneSize
              ? `There are ${quantityOfData} total invoices`
              : `${quantityOfData} invoices`}
          </Text>
        </Flex>
        <Flex gap={8} align="center">
          <FilterByStatusMenu
            selectedStatuses={selectedStatuses}
            onChange={handleStatusChange}
          />
          <NewInvoiceButton onClick={onOpen} />
        </Flex>
      </Flex>
      {quantityOfData > 0 ? (
        <InvoiceList data={filteredInvoices} />
      ) : (
        <EmptyContents />
      )}
      <Drawer
        state="new"
        isOpen={isOpen}
        onClose={onClose}
        updateInvoices={loadInvoices}
      />
    </ContentsWrapper>
  );
}

const useHomeStyles = () => {
  const { colors } = useTheme();
  const { colorMode } = useColorMode();
  const { contentHeaderHeight } = useContentHeight();

  return {
    header: css`
      height: ${contentHeaderHeight};
      align-items: center;
      justify-content: space-between;
    `,

    text: css`
      color: ${colorMode === "light" ? colors.gray[2] : colors.white[1]};
    `,

    heading: css`
      font-family: unset;
      color: ${colorMode === "light" ? colors.black[1] : colors.white[1]};
    `,
  };
};
