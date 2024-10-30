import type { idListType } from "@/data/dataType";

/**
 * Generates a random ID with a specified format.
 * ID consists of 2 uppercase letters followed by 4 digits.
 *
 * @returns {string} The generated ID.
 */
const generateRandomId = () => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";

  let returnId = "";

  for (let i = 0; i < 2; i++) {
    returnId += letters.charAt(Math.floor(Math.random() * letters.length));
  }

  for (let i = 0; i < 4; i++) {
    returnId += numbers.charAt(Math.floor(Math.random() * numbers.length));
  }

  return returnId;
};

export const generateUniqueId = () => {
  const existingIds: idListType = JSON.parse(
    localStorage.getItem("invoiceIds") || "[]",
  );

  let newId = generateRandomId();

  // check if id is unique
  while (existingIds.includes(newId)) {
    newId = generateRandomId();
  }

  return newId;
};
