import { Box, Flex, useTheme } from "@chakra-ui/react";
import type { dataType } from "@/data/dataType";

type statusBadgeProps = Pick<dataType, "status">;

export default function StatusBadge({ status }: statusBadgeProps): JSX.Element {
  const { colors, radii } = useTheme();

  const getStatusStyles = (status: dataType["status"]) => {
    switch (status) {
      case "pending":
        return {
          backgroundColor: colors.orange[2],
          color: colors.orange[1],
        };
      case "paid":
        return {
          backgroundColor: colors.green[2],
          color: colors.green[1],
        };
      case "draft":
        return {
          backgroundColor: colors.gray[6],
          color: colors.gray[5],
        };
      default:
        return {};
    }
  };

  const statusStyles = getStatusStyles(status);

  return (
    <Flex
      align="center"
      justify="center"
      w={28}
      gap={2}
      py={3}
      px={5}
      borderRadius="md"
      fontWeight={700}
      sx={statusStyles}
    >
      <Box
        as="span"
        sx={{
          width: "8px",
          height: "8px",
          borderRadius: radii.full,
          backgroundColor: statusStyles.color,
        }}
      ></Box>
      {/* Capitalize first letter */}
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Flex>
  );
}
