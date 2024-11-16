"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useItemDetail } from "@/hooks/useItemDetail";
import ItemDetail from "@/components/templates/itemDetail";
import AllInvoiceList from "@/components/templates/allInvoiceList";

function SearchItemDetail(): JSX.Element | null {
  const searchParams = useSearchParams();
  const [paramData, setParamData] = useState<string | null>(null);

  const { onOpen: openItemDetail, onClose: closeItemDetail } = useItemDetail();

  useEffect(() => {
    const itemId = searchParams.get("id");
    setParamData(itemId);

    const idLists = localStorage.getItem("invoiceIds");

    if (idLists) {
      const parsedIdLists: string[] = JSON.parse(idLists);
      const foundItem = parsedIdLists.find((value) => value === itemId);

      if (foundItem) {
        openItemDetail();
      } else {
        closeItemDetail();
      }
    } else {
      closeItemDetail();
    }
  }, [searchParams, openItemDetail, closeItemDetail]);

  return paramData ? <ItemDetail id={paramData} /> : null;
}

export default function Home() {
  return (
    <Suspense>
      <AllOrDetail />
    </Suspense>
  );
}

function AllOrDetail() {
  const searchParams = useSearchParams();
  const paramData = searchParams.get("id");

  return paramData ? <SearchItemDetail /> : <AllInvoiceList />;
}
