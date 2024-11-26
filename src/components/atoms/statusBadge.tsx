import { Box, Flex, useTheme, useColorMode } from "@chakra-ui/react";
import type { dataType } from "@/data/dataType";

export type statusBadgeProps = Pick<dataType, "status">;

export default function StatusBadge({ status }: statusBadgeProps): JSX.Element {
  const { colors, radii } = useTheme();
  const { colorMode } = useColorMode();

  const getStatusStyles = (status: dataType["status"]) => {
    switch (status) {
      case "pending":
        return {
          backgroundColor: colors.orange[2],
          color: colorMode === "light" ? colors.orange[3] : colors.orange[1],
        };
      case "paid":
        return {
          backgroundColor: colors.green[2],
          color: colorMode === "light" ? colors.green[3] : colors.green[1],
        };
      case "draft":
        return {
          backgroundColor:
            colorMode === "light" ? colors.gray[6] : colors.gray[7],
          color: colorMode === "light" ? colors.gray[5] : colors.gray[1],
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
