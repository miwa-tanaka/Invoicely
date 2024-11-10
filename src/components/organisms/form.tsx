import { useState, useRef, useEffect, useCallback } from "react";
import { Flex, Text, useTheme } from "@chakra-ui/react";
import { css } from "@emotion/react";
import type { dataType, Item } from "@/data/dataType";
import { useForm, SubmitHandler } from "react-hook-form";
import TextField from "@/components/molecules/inputFields/textField";
import SelectField from "@/components/molecules/inputFields/selectField";
import ItemList from "@/components/molecules/formItemList/index";
import ActionButtons from "@/components/molecules/actionButtons/index";
import { generateUniqueId } from "@/utils/generateId";
import { formatStoringData } from "@/utils/formatStoringData";
import { adjustAndFormatDate } from "@/utils/adjustAndFormatDate";
import { confirmAndClose } from "@/utils/confirmAndClose";

export type FormInputs = {
  id: string;
  senderAddress: string;
  senderCity: string;
  senderPostCode: string;
  senderCountry: string;
  clientName: string;
  clientEmail: string;
  clientAddress: string;
  clientCity: string;
  clientPostCode: string;
  clientCountry: string;
  createdAt: string;
  paymentTerms: number | string;
  description: string;
  items: Item[];
};

type formProps = {
  invoiceId?: string;
  defaultData?: dataType;
  state: "new" | "edit";
  onClose: () => void;
  updateInvoices: () => void;
};

export default function Form({
  invoiceId,
  defaultData,
  state,
  onClose,
  updateInvoices,
}: formProps): JSX.Element {
  const {
    register,
    setValue,
    handleSubmit,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<FormInputs>();

  const { sectionTitle, itemTitle, textFieldWidthHalf, textFieldWidthFull } =
    useFormStyles();
  const errorMessageRef = useRef<HTMLParagraphElement>(null);
  const [minDate, setMinDate] = useState<string>("");
  const [maxDate, setMaxDate] = useState<string>("");
  const [items, setItems] = useState<Item[]>([
    { name: "", quantity: 1, price: 0, total: 0 },
  ]);
  const formRef = useRef<HTMLFormElement>(null);
  const [isValidationEnabled, setIsValidationEnabled] =
    useState<boolean>(false);
  const [emptyNameIndices, setEmptyNameIndices] = useState<number[]>([]);

  const initializeForm = useCallback(() => {
    const setMinMaxDates = (baseDate: string) => {
      setMinDate(adjustAndFormatDate(baseDate, -1));
      setMaxDate(adjustAndFormatDate(baseDate, 1));
    };

    const populateDefaultData = (data: dataType) => {
      // set default input data to each input field
      setValue("createdAt", data.createdAt);
      setValue("description", data.description);
      setValue("paymentTerms", data.paymentTerms);
      setValue("clientName", data.clientName);
      setValue("clientEmail", data.clientEmail);
      setValue("senderAddress", data.senderAddress.street);
      setValue("senderCity", data.senderAddress.city);
      setValue("senderPostCode", data.senderAddress.postCode);
      setValue("senderCountry", data.senderAddress.country);
      setValue("clientAddress", data.clientAddress.street);
      setValue("clientCity", data.clientAddress.city);
      setValue("clientPostCode", data.clientAddress.postCode);
      setValue("clientCountry", data.clientAddress.country);
      setItems(data.items);
    };

    if (defaultData) {
      populateDefaultData(defaultData);
      setMinMaxDates(defaultData.createdAt);
    } else {
      const today = new Date().toISOString().split("T")[0];
      setValue("createdAt", today);
      setMinMaxDates(today);
    }
  }, [defaultData, setValue]);

  useEffect(() => {
    initializeForm();
  }, [initializeForm]);

  const handleError = () => {
    if (errorMessageRef.current) {
      errorMessageRef.current.focus();
    }
  };

  const onSubmit: SubmitHandler<FormInputs> = async () => {
    const data = getValues();
    handleSaveData(data);
  };

  const handleSaveData = (data: FormInputs) => {
    const id =
      state === "new" ? generateUniqueId() : invoiceId || generateUniqueId();
    const invoiceData = formatStoringData(data, id, items);

    const storedInvoices = localStorage.getItem("invoices");
    const invoicesArray = storedInvoices ? JSON.parse(storedInvoices) : [];

    if (state === "edit") {
      // Find the invoice by ID and update it
      const invoiceIndex = invoicesArray.findIndex(
        (invoice: dataType) => invoice.id === id,
      );

      if (invoiceIndex > -1) {
        // Update existing invoice
        invoicesArray[invoiceIndex] = invoiceData;
      } else {
        // If not found, add as new
        invoicesArray.push(invoiceData);
      }
    } else {
      // Add new invoice if state is "new"
      invoicesArray.push(invoiceData);
    }

    localStorage.setItem("invoices", JSON.stringify(invoicesArray));
    updateInvoices();
  };

  const handleSaveClick = () => {
    // no validation
    setIsValidationEnabled(false);

    handleSaveData(getValues());
    // close drawer
    onClose();
  };

  const handleSubmitClick = async () => {
    // Trigger validation on submit
    setIsValidationEnabled(true);

    // Manually trigger validation
    const result = await trigger();

    // check item data
    const hasAtLeastOneItem = items.length > 0;

    if (result && checkEmptyNames() && hasAtLeastOneItem) {
      // Submit if validation passed
      handleSubmit(onSubmit, handleError)();
    } else {
      handleError();
    }
  };

  // Check for empty names in items
  const checkEmptyNames = () => {
    const indices: number[] = [];
    items.forEach((item, index) => {
      if (!item.name) indices.push(index);
    });
    setEmptyNameIndices(indices);
    // Return true if there are no empty names, false otherwise
    return indices.length === 0;
  };

  return (
    <form
      method="POST"
      ref={formRef}
      style={{ height: "100%", overflowY: "auto" }}
    >
      <Flex direction="column" px={{ base: 5, sm: 8 }} pb={4}>
        <Text css={sectionTitle}>Bill From</Text>
        <TextField
          type="text"
          label="Street Address"
          isRequired={isValidationEnabled}
          textFieldName="senderAddress"
          textFieldId="senderAddress"
          autocomplete="street-address"
          inputMode="text"
          register={register("senderAddress", {
            required: isValidationEnabled ? "can't be empty" : false,
            maxLength: {
              value: 100,
              message: "can't be longer than 100 words",
            },
          })}
          errors={errors}
        />
        <Flex gap={3} wrap={{ base: "wrap", sm: "nowrap" }}>
          <TextField
            type="text"
            label="City"
            isRequired={isValidationEnabled}
            textFieldName="senderCity"
            textFieldId="senderCity"
            autocomplete="address-line2"
            inputMode="text"
            register={register("senderCity", {
              required: isValidationEnabled ? "can't be empty" : false,
              maxLength: {
                value: 100,
                message: "can't be longer than 100 words",
              },
            })}
            errors={errors}
            style={textFieldWidthHalf}
          />
          <TextField
            type="text"
            label="Post Code"
            isRequired={isValidationEnabled}
            textFieldName="senderPostCode"
            textFieldId="senderPostCode"
            autocomplete="postal-code"
            inputMode="text"
            register={register("senderPostCode", {
              required: isValidationEnabled ? "can't be empty" : false,
              maxLength: {
                value: 20,
                message: "can't be longer than 20 words",
              },
            })}
            errors={errors}
            style={textFieldWidthHalf}
          />
          <TextField
            type="text"
            label="Country"
            isRequired={isValidationEnabled}
            textFieldName="senderCountry"
            textFieldId="senderCountry"
            autocomplete="country-name"
            inputMode="text"
            register={register("senderCountry", {
              required: isValidationEnabled ? "can't be empty" : false,
              maxLength: {
                value: 100,
                message: "can't be longer than 100 words",
              },
            })}
            errors={errors}
            style={textFieldWidthFull}
          />
        </Flex>

        <Text css={sectionTitle}>Bill To</Text>
        <TextField
          type="text"
          label="Client’s Name"
          isRequired={isValidationEnabled}
          textFieldName="clientName"
          textFieldId="clientName"
          autocomplete="name"
          inputMode="text"
          register={register("clientName", {
            required: isValidationEnabled ? "can't be empty" : false,
            maxLength: {
              value: 100,
              message: "can't be longer than 100 words",
            },
          })}
          errors={errors}
        />
        <TextField
          type="email"
          label="Client’s Email"
          isRequired={isValidationEnabled}
          textFieldName="clientEmail"
          textFieldId="clientEmail"
          autocomplete="email"
          inputMode="email"
          register={register("clientEmail", {
            required: isValidationEnabled ? "can't be empty" : false,
            pattern: {
              value:
                /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/,
              message: "aaaaa",
            },
          })}
          errors={errors}
        />
        <TextField
          type="text"
          label="Street Address"
          isRequired={isValidationEnabled}
          textFieldName="clientAddress"
          textFieldId="clientAddress"
          autocomplete="street-address"
          inputMode="text"
          register={register("clientAddress", {
            required: isValidationEnabled ? "can't be empty" : false,
            maxLength: {
              value: 100,
              message: "can't be longer than 100 words",
            },
          })}
          errors={errors}
        />
        <Flex gap={3} wrap={{ base: "wrap", sm: "nowrap" }}>
          <TextField
            type="text"
            label="City"
            isRequired={isValidationEnabled}
            textFieldName="clientCity"
            textFieldId="clientCity"
            autocomplete="address-line2"
            inputMode="text"
            register={register("clientCity", {
              required: isValidationEnabled ? "can't be empty" : false,
              maxLength: {
                value: 100,
                message: "can't be longer than 100 words",
              },
            })}
            errors={errors}
            style={textFieldWidthHalf}
          />
          <TextField
            type="text"
            label="Post Code"
            isRequired={isValidationEnabled}
            textFieldName="clientPostCode"
            textFieldId="clientPostCode"
            autocomplete="postal-code"
            inputMode="text"
            register={register("clientPostCode", {
              required: isValidationEnabled ? "can't be empty" : false,
              maxLength: {
                value: 20,
                message: "can't be longer than 20 words",
              },
            })}
            errors={errors}
            style={textFieldWidthHalf}
          />
          <TextField
            type="text"
            label="Country"
            isRequired={isValidationEnabled}
            textFieldName="clientCountry"
            textFieldId="clientCountry"
            autocomplete="country-name"
            inputMode="text"
            register={register("clientCountry", {
              required: isValidationEnabled ? "can't be empty" : false,
              maxLength: {
                value: 100,
                message: "can't be longer than 100 words",
              },
            })}
            errors={errors}
            style={textFieldWidthFull}
          />
        </Flex>
        <Flex gap={3} direction={{ base: "column", sm: "row" }}>
          <TextField
            type="date"
            label="Invoice Date"
            isRequired={isValidationEnabled}
            textFieldName="createdAt"
            textFieldId="createdAt"
            autocomplete="date"
            min={minDate}
            max={maxDate}
            register={register("createdAt", {
              required: isValidationEnabled ? "can't be empty" : false,
            })}
            errors={errors}
          />
          <SelectField
            label="Payment Terms"
            isRequired={isValidationEnabled}
            selectFieldName="paymentTerms"
            selectFieldId="paymentTerms"
            register={register("paymentTerms", {
              required: isValidationEnabled ? "Please select one" : false,
            })}
            options={[1, 7, 14, 30]}
            errors={errors}
          />
        </Flex>
        <TextField
          type="text"
          label="Project Description"
          isRequired={isValidationEnabled}
          textFieldName="description"
          textFieldId="description"
          autocomplete="off"
          inputMode="text"
          register={register("description", {
            required: isValidationEnabled ? "can't be empty" : false,
            maxLength: {
              value: 100,
              message: "can't be longer than 100 words",
            },
          })}
          errors={errors}
        />
        <Text css={itemTitle}>Item List</Text>
        <ItemList
          items={items}
          setItems={setItems}
          required={isValidationEnabled}
          errors={emptyNameIndices}
        />
      </Flex>
      <ActionButtons
        onSaveClick={handleSaveClick}
        onSubmitClick={handleSubmitClick}
        onDiscardClick={() =>
          confirmAndClose(
            "Are you sure you want to discard your changes?",
            onClose,
          )
        }
        onCancelClick={() =>
          confirmAndClose(
            "Are you sure you want to cancel editing this item?",
            onClose,
          )
        }
        formRef={formRef}
        state={state}
      />
    </form>
  );
}

export const useFormStyles = () => {
  const { space, colors, fontSizes, breakpoints } = useTheme();
  const gapValue = space[3];
  return {
    sectionTitle: css`
      color: ${colors.purple[1]};
      font-weight: 700;
      margin-top: ${space[6]};
    `,
    itemTitle: css`
      color: ${colors.gray[3]};
      font-size: ${fontSizes["lg"]};
      font-weight: 700;
      margin-top: ${space[10]};
      margin-bottom: ${space[4]};
    `,
    textFieldWidthHalf: css`
      width: calc(50% - (${gapValue} / 2));

      @media screen and (min-width: ${breakpoints["sm"]}) {
        width: calc(33.33% - (${gapValue} / 3));
      }
    `,
    textFieldWidthFull: css`
      width: 100%;

      @media screen and (min-width: ${breakpoints["sm"]}) {
        width: calc(33.33% - (${gapValue} / 3));
      }
    `,
  };
};
