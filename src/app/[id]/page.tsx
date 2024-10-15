"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import type { dataType } from "@/data/dataType";
import ContentsWrapper from "@/components/templates/contentsWrapper";
import ItemDetails from "@/components/molecules/itemDetails";

const ItemDetailPage = () => {
  const { id } = useParams();
  const [item, setItem] = useState<dataType | undefined>();

  useEffect(() => {
    // Retrieve data from localStorage
    const storedData = localStorage.getItem("invoices");

    if (storedData) {
      const itemsData: dataType[] = JSON.parse(storedData);
      // Find the item by id
      const foundItem = itemsData.find((item) => item.id === id);
      setItem(foundItem);
    }
  }, [id]);

  console.log(item, "item");

  return (
    <ContentsWrapper>{item && <ItemDetails data={item} />}</ContentsWrapper>
  );
};

export default ItemDetailPage;
