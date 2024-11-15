import { useRouter } from "next/navigation";
import { Flex, useTheme, useColorMode, Button } from "@chakra-ui/react";
import { css } from "@emotion/react";
import ArrowLeftIcon from "@/components/atoms/icons/arrowLeftIcon";
import type { dataType } from "@/data/dataType";
import DetailTable from "@/components/molecules/itemDetails/detailTable";
import Price from "@/components/molecules/itemDetails/price/index";
import StatusHeading from "@/components/molecules/itemDetails/statusHeading";
import { useContentHeight } from "@/hooks/useContentWidth";
import { useHeaderSize } from "@/hooks/useHeaderSize";
import { useIsLargerThanTabletSize } from "@/hooks/useIsLargerThanTabletSize";
import { useIsLargerThanPhoneSize } from "@/hooks/useIsLargerThanPhoneSize";
import { useItemDetail } from "@/hooks/useItemDetail";

type itemDetailsProps = {
  data: dataType;
  onStatusUpdate: () => void;
  isDeleteModalOpen: boolean;
  onDeleteModalOpen: () => void;
  onDeleteModalClose: () => void;
};

export default function ItemDetails({
  data,
  onStatusUpdate,
  isDeleteModalOpen,
  onDeleteModalOpen,
  onDeleteModalClose,
}: itemDetailsProps): JSX.Element {
  const { contesWrapper, link, wrapper } = useItemDetailsStyles();
  const { onClose } = useItemDetail();

  const router = useRouter();

  const setPram = () => {
    router.push(`/`);
    onClose();
  };

  return (
    <Flex direction="column" gap={6} css={contesWrapper}>
      <Button onClick={setPram} css={link}>
        <ArrowLeftIcon />
        Go back
      </Button>
      <StatusHeading
        status={data.status}
        id={data.id}
        onStatusUpdate={onStatusUpdate}
        isDeleteModalOpen={isDeleteModalOpen}
        onDeleteModalOpen={onDeleteModalOpen}
        onDeleteModalClose={onDeleteModalClose}
      />
      <Flex css={wrapper}>
        <DetailTable
          id={data.id}
          createdAt={data.createdAt}
          paymentDue={data.paymentDue}
          description={data.description}
          clientName={data.clientName}
          clientEmail={data.clientEmail}
          senderAddress={data.senderAddress}
          clientAddress={data.clientAddress}
        />
        <Price items={data.items} total={data.total} />
      </Flex>
    </Flex>
  );
}

export const useItemDetailsStyles = () => {
  const { colors, space, radii, breakpoints } = useTheme();
  const { colorMode } = useColorMode();
  const { contentMarginTop } = useContentHeight();
  const isLargerThanTabletSize = useIsLargerThanTabletSize();
  const isLargerThanPhoneSize = useIsLargerThanPhoneSize();
  const { headerSize, statusHeadingButtonHeight } = useHeaderSize();

  const listHeight = isLargerThanTabletSize
    ? `calc(100svh - ${contentMarginTop})`
    : isLargerThanPhoneSize
    ? `calc(100svh - ${headerSize} - ${contentMarginTop})`
    : `calc(100svh - ${headerSize} - ${contentMarginTop} - ${statusHeadingButtonHeight})`;

  return {
    contesWrapper: css`
      height: ${listHeight};
      overflow-y: auto;
      width: 100%;
    `,
    link: css`
      width: fit-content;
      display: flex;
      align-items: center;
      gap: ${space[5]};
      font-weight: 700;
      color: ${colorMode === "light" ? colors.black[1] : "white"};
      cursor: pointer;
      background-color: transparent;

      &:hover {
        text-decoration: none;
        color: ${colorMode === "light" ? colors.gray[3] : colors.gray[2]};
        background-color: transparent;
      }
    `,
    wrapper: css`
      width: 100%;
      padding: ${space[6]};
      align-items: center;
      flex-direction: column;
      gap: ${space[10]};
      border-radius: ${radii["md"]};
      background-color: ${colorMode === "light" ? "white" : colors.navy[1]};

      @media screen and (min-width: ${breakpoints["md"]}) {
        padding: ${space[12]} ${space[10]};
      }
    `,
  };
};
