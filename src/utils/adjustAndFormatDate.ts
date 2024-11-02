/**
 * Adjusts a given date by a specified number of years and formats it as a string in 'YYYY-MM-DD' format.
 *
 * @param baseDate - The base date in string format (YYYY-MM-DD) to be adjusted.
 * @param years - The number of years to add or subtract from the base date. Positive values add years; negative values subtract years.
 * @returns A formatted date string in 'YYYY-MM-DD' format after adjustment.
 */

export const adjustAndFormatDate = (
  baseDate: string,
  years: number,
): string => {
  const date = new Date(baseDate);

  // Adjust the year by the specified amount
  date.setFullYear(date.getFullYear() + years);

  // Format the date to 'YYYY-MM-DD' in Japanese locale and replace '/' with '-'
  const formattedDate = date
    .toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .replace(/\//g, "-");

  return formattedDate;
};
