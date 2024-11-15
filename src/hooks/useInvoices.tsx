import { useState, useCallback } from "react";
import { jsonDataType } from "@/data/dataType";

type UseInvoicesReturnType = {
  invoices: jsonDataType;
  quantity: number;
  loadInvoices: () => void;
};

export function useInvoices(): UseInvoicesReturnType {
  const [invoices, setInvoices] = useState<jsonDataType>([]);
  const [quantity, setQuantity] = useState<number>(0);

  const loadInvoices = useCallback(() => {
    const storedInvoices = localStorage.getItem("invoices");
    const parsedInvoices: jsonDataType = storedInvoices
      ? JSON.parse(storedInvoices)
      : [];

    setInvoices(parsedInvoices);

    // Create a list of IDs
    const invoiceIds = parsedInvoices.map((invoice) => invoice.id);
    localStorage.setItem("invoiceIds", JSON.stringify(invoiceIds));

    setQuantity(parsedInvoices.length);
  }, []);

  return {
    invoices,
    quantity,
    loadInvoices,
  };
}
