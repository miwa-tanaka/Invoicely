import {
  Stack,
  Checkbox,
  CheckboxGroup,
  Button,
  Menu,
  MenuButton,
  MenuList,
  useTheme,
  useColorMode,
} from "@chakra-ui/react";
import { css } from "@emotion/react";
import ArrowDownIcon from "../atoms/icons/arrowDownIcon";
import { useIsLargerThanPhoneSize } from "@/hooks/useIsLargerThanPhoneSize";
import type { statusDataArray } from "@/data/dataType";

export default function FilterByStatusMenu({
  selectedStatuses,
  onChange,
}: {
  selectedStatuses: statusDataArray;
  onChange: (newStatuses: statusDataArray) => void;
}): JSX.Element {
  const { button, menuWrapper, checkbox } = NewInvoiceButtonStyles();
  const isLargerThanPhoneSize = useIsLargerThanPhoneSize();

  const checkBoxData: statusDataArray = ["draft", "pending", "paid"];

  const handleCheckboxChange = (values: statusDataArray) => {
    onChange(values);
  };

  return (
    <Menu closeOnSelect={false}>
      <MenuButton as={Button} rightIcon={<ArrowDownIcon />} css={button}>
        {isLargerThanPhoneSize ? "Filter by status" : "Filter"}
      </MenuButton>
      <MenuList py={4} px={6} css={menuWrapper}>
        <CheckboxGroup value={selectedStatuses} onChange={handleCheckboxChange}>
          <Stack spacing={[1, 3]} direction="column">
            {checkBoxData.map((status) => (
              <Checkbox key={status} size="md" value={status} css={checkbox}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Checkbox>
            ))}
          </Stack>
        </CheckboxGroup>
      </MenuList>
    </Menu>
  );
}

export const NewInvoiceButtonStyles = () => {
  const { colors } = useTheme();
  const { colorMode } = useColorMode();

  return {
    button: css`
      background-color: transparent;
      color: ${colorMode === "light" ? colors.black[1] : colors.white[1]};
      border: 2px solid transparent;

      &:hover {
        background-color: transparent;
        border: 2px solid ${colors.purple[1]};
      }

      &[data-active] {
        background-color: transparent;
      }
    `,

    menuWrapper: css`
      border-color: ${colors.white[1]};
      box-shadow: 0px 10px 20px rgba(72, 84, 159, 0.25);
    `,

    checkbox: css`
      font-weight: 700;

      &:hover {
        .chakra-checkbox__control {
          border-color: ${colors.purple[1]};
        }
      }

      .chakra-checkbox__control {
        background-color: ${colors.gray[1]};
        border-color: ${colors.gray[1]};
        transition: 0.2s ease;

        &[aria-checked="true"],
        &[data-checked] {
          background-color: ${colors.purple[1]};
          border-color: ${colors.purple[1]};
        }
      }
    `,
  };
};
