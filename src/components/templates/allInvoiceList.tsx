import { useEffect, useState, useMemo } from "react";
import { Flex, Heading, Text, useTheme, useColorMode } from "@chakra-ui/react";
import { css } from "@emotion/react";
import ContentsWrapper from "@/components/templates/contentsWrapper";
import Drawer from "@/components/organisms/drawer";
import FilterByStatusMenu from "@/components/organisms/filterByStatusMenu";
import NewInvoiceButton from "@/components/molecules/newInvoiceButton";
import InvoiceList from "@/components/molecules/invoiceList";
import EmptyContents from "@/components/molecules/emptyContents";
import type { statusDataArray } from "@/data/dataType";
import { useContentHeight } from "@/hooks/useContentWidth";
import { useIsLargerThanPhoneSize } from "@/hooks/useIsLargerThanPhoneSize";
import { useDrawer } from "@/hooks/useDrawer";
import { useInvoices } from "@/hooks/useInvoices";

type allInvoiceListProps = object;

export default function AllInvoiceList({}: allInvoiceListProps): JSX.Element {
  const { header, text, heading } = useAllInvoiceListStyles();
  const isLargerThanPhoneSize = useIsLargerThanPhoneSize();
  const { isOpen, onOpen, onClose } = useDrawer();
  const [selectedStatuses, setSelectedStatuses] = useState<statusDataArray>([]);

  const { invoices, quantity, loadInvoices } = useInvoices();

  const handleStatusChange = (newStatuses: statusDataArray) => {
    setSelectedStatuses(newStatuses);
  };

  const filteredInvoices = useMemo(() => {
    return invoices.filter(
      (invoice) =>
        selectedStatuses.length === 0 ||
        selectedStatuses.includes(invoice.status),
    );
  }, [invoices, selectedStatuses]);

  useEffect(() => {
    loadInvoices();
  }, [loadInvoices]);

  return (
    <ContentsWrapper>
      <Flex css={header}>
        <Flex direction="column">
          <Heading as="h1" size="xl" css={heading}>
            Invoices
          </Heading>
          <Text css={text}>
            {isLargerThanPhoneSize
              ? `There are ${quantity} total invoices`
              : `${quantity} invoices`}
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
      {quantity > 0 ? (
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

export const useAllInvoiceListStyles = () => {
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
      color: ${colorMode === "light" ? colors.gray[9] : colors.white[1]};
    `,

    heading: css`
      font-family: unset;
      color: ${colorMode === "light" ? colors.black[1] : colors.white[1]};
    `,
  };
};
