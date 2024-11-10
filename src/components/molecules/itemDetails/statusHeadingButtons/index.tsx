import { Flex, useTheme } from "@chakra-ui/react";
import { css } from "@emotion/react";
import EditButton from "@/components/molecules/itemDetails/statusHeadingButtons/buttons/editButton";
import DeleteModalButton from "@/components/molecules/itemDetails/statusHeadingButtons/buttons/deleteModalButton";
import MarkAsPaidButton from "@/components/molecules/itemDetails/statusHeadingButtons/buttons/markAsPaidButton";
import type { dataType } from "@/data/dataType";
import { useHeaderSize } from "@/hooks/useHeaderSize";

type statusHeadingButtonsProps = {
  status: dataType["status"];
  id: dataType["id"];
  onStatusUpdate: () => void;
  onDeleteModalOpen: () => void;
};

export default function StatusHeadingButtons({
  status,
  id,
  onStatusUpdate,
  onDeleteModalOpen,
}: statusHeadingButtonsProps): JSX.Element {
  const { wrapper } = useStatusHeadingButtonsStyles();

  return (
    <Flex css={wrapper}>
      <EditButton />
      <DeleteModalButton onClick={onDeleteModalOpen} />
      {status === "pending" && (
        <MarkAsPaidButton id={id} onStatusUpdate={onStatusUpdate} />
      )}
    </Flex>
  );
}

export const useStatusHeadingButtonsStyles = () => {
  const { space, breakpoints } = useTheme();
  const { statusHeadingButtonHeight } = useHeaderSize();

  return {
    wrapper: css`
      align-items: center;
      justify-content: space-between;
      gap: ${space[2]};
      height: ${statusHeadingButtonHeight};
      position: sticky;
      bottom: 0;
      padding: 0 ${space[4]};

      @media screen and (min-width: ${breakpoints["sm"]}) {
        height: auto;
        position: unset;
        padding: 0;
      }
    `,
  };
};
