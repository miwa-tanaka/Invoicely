import { Flex, Text, useTheme, useColorMode } from "@chakra-ui/react";
import { css } from "@emotion/react";
import StatusBadge from "@/components/atoms/statusBadge";
import type { dataType } from "@/data/dataType";
import DeleteModal from "@/components/molecules/itemDetails/deleteModal";
import { useIsLargerThanPhoneSize } from "@/hooks/useIsLargerThanPhoneSize";
import StatusHeadingButtons from "@/components/molecules/itemDetails/statusHeadingButtons";

type statusHeadingProps = {
  status: dataType["status"];
  id: dataType["id"];
  onStatusUpdate: () => void;
  isDeleteModalOpen: boolean;
  onDeleteModalOpen: () => void;
  onDeleteModalClose: () => void;
};

export default function StatusHeading({
  status,
  id,
  onStatusUpdate,
  isDeleteModalOpen,
  onDeleteModalOpen,
  onDeleteModalClose,
}: statusHeadingProps): JSX.Element {
  const { heading, text } = useStatusHeadingStyles();
  const isLargerThanPhoneSize = useIsLargerThanPhoneSize();

  return (
    <>
      <Flex css={heading}>
        <Flex align="center" gap={5}>
          <Text css={text}>Status</Text>
          <StatusBadge status={status} />
        </Flex>
        {isLargerThanPhoneSize && (
          <StatusHeadingButtons
            status={status}
            id={id}
            onStatusUpdate={onStatusUpdate}
            onDeleteModalOpen={onDeleteModalOpen}
          />
        )}
      </Flex>
      <DeleteModal
        id={id}
        isOpen={isDeleteModalOpen}
        onClose={onDeleteModalClose}
      />
    </>
  );
}

export const useStatusHeadingStyles = () => {
  const { colors, space, radii, breakpoints } = useTheme();
  const { colorMode } = useColorMode();

  return {
    heading: css`
      width: 100%;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      padding: ${space[6]} ${space[8]};
      border-radius: ${radii["md"]};
      background-color: ${colorMode === "light" ? "white" : colors.navy[1]};
      gap: ${space[4]};

      @media screen and (min-width: ${breakpoints["md"]}) {
        gap: 0;
      }
    `,
    text: css`
      color: ${colorMode === "light" ? colors.gray[10] : colors.gray[1]};
    `,
  };
};
