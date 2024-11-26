import type { dataType, Item } from "@/data/dataType";
import type { FormInputs } from "@/components/organisms/form";

/**
 * Calculate the payment due date based on the creation date and payment terms.
 *
 * @param {string} createdAt - The creation date in "YYYY-MM-DD" format.
 * @param {number} paymentTerms - The number of days after which payment is due.
 * @returns {string} The calculated due date in "YYYY-MM-DD" format.
 */

function calculatePaymentDue(createdAt: string, paymentTerms: number): string {
  const createdDate = new Date(createdAt);
  const daysToAdd = paymentTerms || 0;
  createdDate.setDate(createdDate.getDate() + daysToAdd);
  return createdDate.toISOString().split("T")[0];
}

/**
 * Format form data for storage in local storage by adding additional fields
 * like `id`, `total`, `paymentDue`, and restructuring addresses.
 *
 * @param {FormInputs} data - The input data from the form.
 * @param {string} id - The unique identifier for the invoice.
 * @param {Item[]} items - Array of items to be billed.
 * @returns {dataType} The formatted data structure for storage.
 */

export function formatStoringData(
  data: FormInputs,
  id: dataType["id"],
  items: Item[],
  isSave: boolean,
): dataType {
  // Calculate the total price for all items
  const total: number = items.reduce((accumulator, currentItem) => {
    return accumulator + currentItem.total;
  }, 0);

  // Convert payment terms to number if provided as string
  const terms =
    typeof data.paymentTerms === "string"
      ? parseInt(data.paymentTerms, 10) || 0
      : data.paymentTerms;

  // Calculate the payment due date based on created date and terms
  const paymentDue = calculatePaymentDue(data.createdAt, terms);

  const formattedPaymentTerms: number =
    typeof data.paymentTerms === "string"
      ? parseInt(data.paymentTerms, 10) || 0
      : data.paymentTerms;

  // Structure the data as required for storage
  const formattedData: dataType = {
    id: id,
    createdAt: data.createdAt,
    paymentDue: paymentDue,
    description: data.description,
    paymentTerms: formattedPaymentTerms,
    clientName: data.clientName,
    clientEmail: data.clientEmail,
    status: isSave ? "draft" : "pending",
    senderAddress: {
      street: data.senderAddress,
      city: data.senderCity,
      postCode: data.senderPostCode,
      country: data.senderCountry,
    },
    clientAddress: {
      street: data.clientAddress,
      city: data.clientCity,
      postCode: data.clientPostCode,
      country: data.clientCountry,
    },
    items: items,
    total: total,
  };

  return formattedData;
}
