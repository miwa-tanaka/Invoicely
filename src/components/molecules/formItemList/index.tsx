import { css } from "@emotion/react";
import {
  ListItem,
  UnorderedList,
  Flex,
  Text,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer,
  useTheme,
  useColorMode,
} from "@chakra-ui/react";
import ButtonBase from "@/components/atoms/buttonBase";
import PlusIcon from "@/components/atoms/icons/plusIcon";
import DeleteIcon from "@/components/atoms/icons/deleteIcon";
import type { Item } from "@/data/dataType";
import ItemListInput from "@/components/molecules/formItemList/input";
import { useTextFieldStyles } from "@/components/molecules/inputFields/textField";
import { useIsLargerThanPhoneSize } from "@/hooks/useIsLargerThanPhoneSize";

type itemListProps = {
  items: Item[];
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
  required: boolean;
  errors: number[];
};

export default function ItemList({
  items,
  setItems,
  required,
  errors,
}: itemListProps): JSX.Element {
  const { table, addItemButton, deleteButton, listWrapper } =
    useItemListStyles();
  const { error } = useTextFieldStyles();
  const isLargerThanPhoneSize = useIsLargerThanPhoneSize();

  const addItem = () => {
    setItems([...items, { name: "", quantity: 1, price: 0, total: 0 }]);
  };

  const removeItem = (index: number) => {
    if (items.length === 1) {
      alert("Item List: At least one item is required.");
      return;
    }

    setItems(items.filter((_, i) => i !== index));
  };

  const handleItemChange = (
    index: number,
    field: string,
    value: string | number,
  ) => {
    const updatedItems = items.map((item, i) => {
      if (i === index) {
        const updatedItem = { ...item, [field]: value };

        if (field === "price" || field === "quantity") {
          const price = isNaN(Number(updatedItem.price))
            ? 0
            : Number(updatedItem.price);
          const quantity = isNaN(Number(updatedItem.quantity))
            ? 0
            : Number(updatedItem.quantity);

          updatedItem.total = price * quantity;
        }

        return updatedItem;
      }
      return item;
    });

    setItems(updatedItems);
  };

  return (
    <>
      {isLargerThanPhoneSize ? (
        <TableContainer css={table}>
          <Table>
            <Thead>
              <Tr>
                <Th>Item Name</Th>
                <Th>Qty.</Th>
                <Th>Price</Th>
                <Th>Total</Th>
                <Th>
                  <Text as="span" className="hiddenText">
                    Delete item
                  </Text>
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {items.map((item, index) => {
                const hasError = errors.includes(index);

                return (
                  <Tr key={index}>
                    <Td>
                      <ItemListInput
                        value={item.name}
                        type="text"
                        isRequired={required}
                        itemId={`${index}-name`}
                        inputMode="text"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleItemChange(index, "name", e.target.value)
                        }
                        hasError={hasError}
                        ariaLabel={`Name of item ${index + 1}`}
                      />
                    </Td>
                    <Td>
                      <ItemListInput
                        value={item.quantity}
                        type="number"
                        isRequired={required}
                        itemId={`${index}-quantity`}
                        inputMode="numeric"
                        min={1}
                        max={100}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          const inputValue = e.target.value;
                          const parsedValue =
                            inputValue === "" ? 0 : parseFloat(inputValue);
                          handleItemChange(index, "quantity", parsedValue);
                        }}
                        ariaLabel={`Quantity of item ${index + 1}`}
                      />
                    </Td>
                    <Td isNumeric>
                      <ItemListInput
                        value={item.price.toString()}
                        type="text"
                        isRequired={required}
                        itemId={`${index}-price`}
                        inputMode="decimal"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          const inputValue = e.target.value;

                          if (/^[0-9]*\.?[0-9]*$/.test(inputValue)) {
                            handleItemChange(index, "price", inputValue);
                          }
                        }}
                        onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                          const inputValue = e.target.value;

                          const numericValue = parseFloat(inputValue) || 0;
                          handleItemChange(index, "price", numericValue);
                        }}
                        ariaLabel={`Price of item ${index + 1}`}
                      />
                    </Td>
                    <Td isNumeric>{item.total.toFixed(2)}</Td>
                    <Td>
                      <ButtonBase
                        type="button"
                        text=""
                        icon={<DeleteIcon />}
                        aria-label="Delete item"
                        style={deleteButton}
                        onClick={() => removeItem(index)}
                      />
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
            <Tfoot>
              <Tr>
                <Th colSpan={5}>
                  <ButtonBase
                    type="button"
                    icon={<PlusIcon />}
                    text="Add New Item"
                    style={addItemButton}
                    onClick={addItem}
                  />
                </Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      ) : (
        <Flex direction="column" w="full" gap={12} css={listWrapper}>
          <UnorderedList m={0} display="flex" flexDirection="column" gap={12}>
            {items.map((item, index) => {
              const hasError = errors.includes(index);

              return (
                <ListItem
                  key={index}
                  display="flex"
                  flexDirection="column"
                  w="full"
                  gap={6}
                >
                  <Flex direction="column" gap={2}>
                    <Text className="title" fontWeight={500}>
                      Item Name
                    </Text>
                    <ItemListInput
                      value={item.name}
                      type="text"
                      isRequired={required}
                      itemId={`${index}-name`}
                      inputMode="text"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleItemChange(index, "name", e.target.value)
                      }
                      hasError={hasError}
                      ariaLabel={`Name of item ${index + 1}`}
                    />
                  </Flex>
                  <Flex justify="space-between" gap={4}>
                    <Flex direction="column" gap={2}>
                      <Text className="title" fontWeight={500}>
                        Qty.
                      </Text>
                      <ItemListInput
                        value={item.quantity}
                        type="number"
                        isRequired={required}
                        itemId={`${index}-quantity`}
                        inputMode="numeric"
                        min={1}
                        max={100}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          const inputValue = e.target.value;
                          const parsedValue =
                            inputValue === "" ? 0 : parseFloat(inputValue);
                          handleItemChange(index, "quantity", parsedValue);
                        }}
                        ariaLabel={`Quantity of item ${index + 1}`}
                      />
                    </Flex>
                    <Flex direction="column" w="30%" gap={2}>
                      <Text className="title" fontWeight={500}>
                        Price
                      </Text>
                      <ItemListInput
                        value={item.price.toString()}
                        type="text"
                        isRequired={required}
                        itemId={`${index}-price`}
                        inputMode="decimal"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          const inputValue = e.target.value;

                          if (/^[0-9]*\.?[0-9]*$/.test(inputValue)) {
                            handleItemChange(index, "price", inputValue);
                          }
                        }}
                        onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                          const inputValue = e.target.value;

                          const numericValue = parseFloat(inputValue) || 0;
                          handleItemChange(index, "price", numericValue);
                        }}
                        ariaLabel={`Price of item ${index + 1}`}
                      />
                    </Flex>
                    <Flex direction="column" w="30%" gap={4}>
                      <Text className="title" fontWeight={500}>
                        Total
                      </Text>
                      <Text className="title" fontWeight={700}>
                        {item.total.toFixed(2)}
                      </Text>
                    </Flex>
                    <Flex align="end">
                      <ButtonBase
                        type="button"
                        text=""
                        icon={<DeleteIcon />}
                        aria-label="Delete item"
                        style={deleteButton}
                        onClick={() => removeItem(index)}
                      />
                    </Flex>
                  </Flex>
                </ListItem>
              );
            })}
          </UnorderedList>
          <ButtonBase
            type="button"
            icon={<PlusIcon />}
            text="Add New Item"
            style={addItemButton}
            onClick={addItem}
          />
        </Flex>
      )}
    </>
  );
}

export const useItemListStyles = () => {
  const { colors, space } = useTheme();
  const { colorMode } = useColorMode();

  const fontStyle = `${
    colorMode === "light" ? colors.gray[10] : colors.gray[1]
  }`;

  return {
    table: css`
      thead {
        tr {
          th {
            padding: ${space[2]};
            text-transform: none;
            color: ${fontStyle};

            &:first-of-type {
              width: 43%;
            }

            .hiddenText {
              position: absolute;
              clip: rect(1px, 1px, 1px, 1px);
              height: 1px;
              width: 1px;
              overflow: hidden;
              white-space: nowrap;
            }
          }
        }
      }
      tbody {
        tr {
          td {
            padding: ${space[2]};

            &:nth-of-type(4) {
              font-weight: 700;
              color: ${fontStyle};
            }
          }
        }
      }
    `,
    addItemButton: css`
      width: 100%;
      color: ${colorMode === "light" ? colors.gray[10] : colors.gray[1]};
      font-weight: 700;
      background-color: ${colorMode === "light"
        ? colors.white[2]
        : colors.navy[2]};

      svg path {
        fill: ${fontStyle};
      }

      &:hover {
        background-color: ${colorMode === "light"
          ? colors.gray[1]
          : colors.navy[1]};
      }
    `,
    deleteButton: css`
      background-color: transparent;

      &:hover {
        background-color: transparent;

        svg path {
          fill: ${colorMode === "light" ? colors.red[3] : colors.red[1]};
        }
      }
    `,
    listWrapper: css`
      .title {
        color: ${fontStyle};
      }
    `,
  };
};
