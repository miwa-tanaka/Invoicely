import { Box } from "@chakra-ui/react";
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
}: textFieldProps): JSX.Element {
  const { inputStyle, inputError } = useTextFieldStyles();

  return (
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
    />
  );
}
