import NextLink from "next/link";
import { Link, Flex, Text, useTheme, useColorMode } from "@chakra-ui/react";
import { css } from "@emotion/react";
import ArrowLeftIcon from "@/components/atoms/icons/arrowLeftIcon";
import StatusButtons from "@/components/molecules/itemDetails/statusButtons";
import type { dataType } from "@/data/dataType";
import DetailTable from "@/components/molecules/itemDetails/detailTable";
import Price from "@/components/molecules/itemDetails/price/index";

type itemDetailsProps = { data: dataType };

export default function ItemDetails({ data }: itemDetailsProps): JSX.Element {
  const { link, wrapper } = useItemDetailsStyles();
  console.log(data, "data");

  return (
    <Flex direction="column" gap={6}>
      <Link as={NextLink} href="/" css={link}>
        <ArrowLeftIcon />
        Go back
      </Link>
      <StatusButtons status={data.status} id={data.id} />
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
  const { colors, space, radii } = useTheme();
  const { colorMode } = useColorMode();

  return {
    link: css`
      display: flex;
      align-items: center;
      gap: ${space[5]};
      font-weight: 700;
      color: ${colorMode === "light" ? colors.black[1] : "white"};
      cursor: pointer;

      &:hover {
        text-decoration: none;
        color: ${colorMode === "light" ? colors.gray[3] : colors.gray[2]};
      }
    `,
    wrapper: css`
      width: 100%;
      padding: ${space[12]} ${space[10]};
      align-items: center;
      flex-direction: column;
      gap: ${space[10]};
      border-radius: ${radii["md"]};
      background-color: ${colorMode === "light" ? "white" : colors.navy[1]};
    `,
  };
};
