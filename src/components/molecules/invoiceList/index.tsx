import { Flex, useTheme } from "@chakra-ui/react";
import type { jsonDataType } from "@/data/dataType";
import InvoiceListItem from "@/components/molecules/invoiceList/item/index";
import { useContentHeight } from "@/hooks/useContentWidth";
import { useHeaderSize } from "@/hooks/useHeaderSize";
import { useIsLargerThanTabletSize } from "@/hooks/useIsLargerThanTabletSize";
import { useIsLargerThanPhoneSize } from "@/hooks/useIsLargerThanPhoneSize";

type invoiceListProps = {
  data: jsonDataType;
};

export default function InvoiceList({ data }: invoiceListProps): JSX.Element {
  const { contentHeaderHeight, contentMarginTop } = useContentHeight();
  const { headerSize } = useHeaderSize();
  const { space } = useTheme();
  const isLargerThanTabletSize = useIsLargerThanTabletSize();
  const isLargerThanPhoneSize = useIsLargerThanPhoneSize();

  const marginSize = isLargerThanTabletSize
    ? space[16]
    : isLargerThanPhoneSize
    ? space[14]
    : space[7];

  const listHeight = isLargerThanTabletSize
    ? `calc(100svh - ${contentHeaderHeight} - ${contentMarginTop} - ${marginSize} - ${marginSize})`
    : `calc(100svh - ${headerSize} - ${contentHeaderHeight} - ${contentMarginTop} - ${marginSize} - ${marginSize})`;

  return (
    <Flex
      h={listHeight}
      direction="column"
      gap={4}
      my={marginSize}
      overflowY="scroll"
    >
      {data.map((v, k) => (
        <InvoiceListItem
          key={k}
          id={v.id}
          createdAt={v.createdAt}
          clientName={v.clientName}
          total={v.total}
          status={v.status}
        />
      ))}
    </Flex>
  );
}
