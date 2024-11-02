/**
 * Displays a confirmation dialog with the provided message.
 * If the user confirms, it calls the provided onClose function.
 *
 * @param {string} message - The confirmation message to display to the user.
 * @param {() => void} onClose - The function to call if the user confirms.
 */
export const confirmAndClose = (message: string, onClose: () => void) => {
  if (window.confirm(message)) onClose();
};
