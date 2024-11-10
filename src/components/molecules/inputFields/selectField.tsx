import { UseFormRegisterReturn } from "react-hook-form";
import { Select, Box, Text } from "@chakra-ui/react";
import { useTextFieldStyles } from "@/components/molecules/inputFields/textField";

type selectFieldProps = {
  label: string;
  isRequired: boolean;
  selectFieldName: string;
  selectFieldId: string;
  register?: UseFormRegisterReturn;
  errors?: {
    [key: string]: {
      message?: string;
    };
  };
  options: number[];
};

export default function SelectField({
  label,
  isRequired,
  selectFieldName,
  selectFieldId,
  register,
  errors,
  options,
}: selectFieldProps): JSX.Element {
  const errorMessage: string | undefined =
    errors && errors[selectFieldName]?.message;

  const hasError: boolean = errorMessage ? true : false;

  const { labelStyle, error, inputStyle, inputError } = useTextFieldStyles();

  return (
    <Box as="fieldset" mt={6} w="full">
      <Box
        as="label"
        id={selectFieldId}
        htmlFor={selectFieldId}
        css={labelStyle}
      >
        {label}
        {hasError ? (
          <Text
            as="span"
            id={`${selectFieldId}-error`}
            role="alert"
            aria-live="polite"
            css={error}
          >
            {errorMessage}
          </Text>
        ) : null}
      </Box>
      <Select
        placeholder="Select option"
        className="select"
        css={[inputStyle, hasError ? inputError : ""]}
        id={selectFieldId}
        name={selectFieldName}
        isRequired={isRequired}
        aria-invalid={hasError}
        aria-labelledby={selectFieldId}
        aria-describedby={`${selectFieldId}-error`}
        {...register}
      >
        {options.map((v, k) => (
          <option key={k} value={v}>
            Net {v} {k !== 0 ? "Days" : "Day"}
          </option>
        ))}
      </Select>
    </Box>
  );
}
