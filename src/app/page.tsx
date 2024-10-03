"use client";

import { useState, useEffect } from "react";
// import invoicesData from "@/data/data.json";
import { css } from "@emotion/react";
import {
  Box,
  Flex,
  Heading,
  Text,
  useTheme,
  useColorMode,
} from "@chakra-ui/react";
import FilterByStatusMenu from "@/components/organisms/filterByStatusMenu";
import NewInvoiceButton from "@/components/molecules/newInvoiceButton";
import InvoiceList from "@/components/molecules/invoiceList";
import EmptyContents from "@/components/molecules/emptyContents";
import type { jsonDataType, statusDataArray } from "@/data/dataType";
import { useContentHeight } from "@/hooks/useContentWidth";
import { useHeaderSize } from "@/hooks/useHeaderSize";
import { useIsLargerThanPhoneSize } from "@/hooks/useIsLargerThanPhoneSize";

export default function Home() {
  const { wrapper, content, header, text, heading } = useHomeStyles();
  const [storageInvoiceData, setStorageInvoiceData] = useState<jsonDataType>(
    [],
  );
  const [quantityOfData, setQuantityOfData] = useState<number>(0);
  const isLargerThanPhoneSize = useIsLargerThanPhoneSize();
  const [selectedStatuses, setSelectedStatuses] = useState<statusDataArray>([]);

  const handleStatusChange = (newStatuses: statusDataArray) => {
    setSelectedStatuses(newStatuses);
  };

  const filteredInvoices = storageInvoiceData.filter(
    (invoice) =>
      selectedStatuses.length === 0 ||
      selectedStatuses.includes(invoice.status),
  );

  useEffect(() => {
    const storedInvoices = localStorage.getItem("invoices");

    const parsedInvoices = storedInvoices ? JSON.parse(storedInvoices) : [];
    setStorageInvoiceData(parsedInvoices);
    setQuantityOfData(parsedInvoices.length);
  }, []);

  console.log(storageInvoiceData, "storageInvoiceData");

  return (
    <Flex css={wrapper}>
      <Box css={content}>
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
            <NewInvoiceButton />
          </Flex>
        </Flex>
        {quantityOfData > 0 ? (
          <InvoiceList data={filteredInvoices} />
        ) : (
          <EmptyContents />
        )}
      </Box>
    </Flex>
  );
}

export const useHomeStyles = () => {
  const { colors, sizes, space, breakpoints } = useTheme();
  const { colorMode } = useColorMode();
  const { contentHeaderHeight, contentMarginTop } = useContentHeight();
  const { headerSize } = useHeaderSize();

  return {
    wrapper: css`
      width: 100vw;
      height: calc(100svh - ${headerSize});
      justify-content: center;

      padding: 0 ${space[6]};
      background-color: ${colorMode === "light"
        ? colors.white[1]
        : colors.black[2]};

      @media screen and (min-width: ${breakpoints["md"]}) {
        width: calc(100vw - ${headerSize});
        height: 100svh;
      }
    `,

    content: css`
      width: ${sizes["3xl"]};
      margin-top: ${contentMarginTop};
    `,

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
