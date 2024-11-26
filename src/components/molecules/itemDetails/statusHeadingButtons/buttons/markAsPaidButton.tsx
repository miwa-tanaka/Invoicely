import { useTheme } from "@chakra-ui/react";
import { css } from "@emotion/react";
import type { dataType } from "@/data/dataType";
import ButtonBase from "@/components/atoms/buttonBase";

type markAsPaidButtonProps = {
  id: dataType["id"];
  onStatusUpdate: () => void;
};

export default function MarkAsPaidButton({
  id,
  onStatusUpdate,
}: markAsPaidButtonProps): JSX.Element {
  const { style } = useMarkAsPaidButtonStyles();

  const markPaid = () => {
    // Retrieve the invoices from localStorage
    const storedData = localStorage.getItem("invoices");
    if (storedData) {
      const itemsData: dataType[] = JSON.parse(storedData);

      // Find and update the item with matching id
      const updatedItems = itemsData.map((invoice) => {
        if (invoice.id === id) {
          return { ...invoice, status: "paid" };
        }
        return invoice;
      });

      // Save updated data back to localStorage
      localStorage.setItem("invoices", JSON.stringify(updatedItems));
      onStatusUpdate();
    }
  };

  return <ButtonBase text="Mark as Paid" onClick={markPaid} style={style} />;
}

export const useMarkAsPaidButtonStyles = () => {
  const { colors, space } = useTheme();

  return {
    style: css`
      padding: 0 ${space[7]};
      background-color: ${colors.purple[3]};
      color: white;
      transition: 0.2s ease;
      cursor: pointer;

      &:hover {
        background-color: ${colors.purple[4]};
      }
    `,
  };
};
