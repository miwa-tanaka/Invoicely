import type { dataType } from "@/data/dataType";
import { useIsLargerThanPhoneSize } from "@/hooks/useIsLargerThanPhoneSize";
import ItemPCLayout from "@/components/molecules/invoiceList/item/itemPCLayout";
import ItemSPLayout from "@/components/molecules/invoiceList/item/itemSPLayout";

type invoiceListItemProps = Pick<
  dataType,
  "id" | "createdAt" | "clientName" | "total" | "status"
>;

export default function InvoiceListItem({
  id,
  createdAt,
  clientName,
  total,
  status,
}: invoiceListItemProps): JSX.Element {
  const isLargerThanPhoneSize = useIsLargerThanPhoneSize();

  return isLargerThanPhoneSize ? (
    <ItemPCLayout
      id={id}
      createdAt={createdAt}
      clientName={clientName}
      total={total}
      status={status}
    />
  ) : (
    <ItemSPLayout
      id={id}
      createdAt={createdAt}
      clientName={clientName}
      total={total}
      status={status}
    />
  );
}
