import { Box, Text } from "@chakra-ui/react";
import { useTextFieldStyles } from "@/components/molecules/inputFields/textField";

type textFieldProps = {
  value: string | number;
  type?: string;
  isRequired: boolean;
  itemId: string;
  autocomplete?: string;
  min?: number;
  max?: number;
  inputMode?: "text" | "numeric" | "decimal";
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  hasError?: boolean;
  ariaLabel: string;
};

export default function ItemListInput({
  value,
  type = "text",
  isRequired,
  itemId,
  autocomplete = "off",
  min,
  max,
  inputMode = "text",
  onChange,
  onBlur,
  hasError,
  ariaLabel,
}: textFieldProps): JSX.Element {
  const { inputStyle, inputError } = useTextFieldStyles();
  const { error } = useTextFieldStyles();

  return (
    <>
      <Box as="fieldset">
        <Box
          as="input"
          className="input"
          css={[inputStyle, hasError ? inputError : ""]}
          value={value}
          type={type}
          id={itemId}
          autoComplete={autocomplete}
          min={min}
          max={max}
          inputMode={inputMode}
          required={isRequired}
          onChange={onChange}
          onBlur={onBlur}
          aria-invalid={hasError}
          aria-labelledby={itemId}
          aria-describedby={`${itemId}-error`}
          aria-label={ariaLabel}
        />
      </Box>
      {hasError ? (
        <Text
          as="span"
          id={`${itemId}-error`}
          role="alert"
          aria-live="polite"
          css={error}
          mt={2}
        >
          can&#39;t be empty
        </Text>
      ) : null}
    </>
  );
}
