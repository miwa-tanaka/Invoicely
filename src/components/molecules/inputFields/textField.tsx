import { UseFormRegisterReturn } from "react-hook-form";
import { css, SerializedStyles } from "@emotion/react";
import { Box, Text, useTheme, useColorMode } from "@chakra-ui/react";

type textFieldProps = {
  type?: string;
  label: string;
  isRequired: boolean;
  textFieldName: string;
  textFieldId: string;
  autocomplete?: string;
  inputMode?:
    | "search"
    | "text"
    | "email"
    | "tel"
    | "url"
    | "none"
    | "numeric"
    | "decimal";
  min?: string;
  max?: string;
  register?: UseFormRegisterReturn;
  errors?: {
    [key: string]: {
      message?: string;
    };
  };
  style?: SerializedStyles;
};

export default function TextField({
  type = "text",
  label,
  isRequired,
  textFieldName,
  textFieldId,
  autocomplete = "off",
  inputMode = "text",
  min,
  max,
  register,
  errors,
  style,
}: textFieldProps): JSX.Element {
  const errorMessage: string | undefined =
    errors && errors[textFieldName]?.message;

  const hasError: boolean = errorMessage ? true : false;

  const { labelStyle, error, inputStyle, inputError } = useTextFieldStyles();

  return (
    <Box as="fieldset" mt={6} w="full" css={style}>
      <Box as="label" id={textFieldId} htmlFor={textFieldId} css={labelStyle}>
        {label}
        {hasError ? (
          <Text
            as="span"
            id={`${textFieldId}-error`}
            role="alert"
            aria-live="polite"
            css={error}
          >
            {errorMessage}
          </Text>
        ) : null}
      </Box>

      <Box
        as="input"
        className="input"
        css={[inputStyle, hasError ? inputError : ""]}
        type={type}
        id={textFieldId}
        name={textFieldName}
        autoComplete={autocomplete}
        inputMode={inputMode}
        min={min}
        max={max}
        required={isRequired}
        aria-invalid={hasError}
        aria-labelledby={textFieldId}
        aria-describedby={`${textFieldId}-error`}
        {...register}
      />
    </Box>
  );
}

export const useTextFieldStyles = () => {
  const { colors, space, radii } = useTheme();
  const { colorMode } = useColorMode();

  return {
    labelStyle: css`
      display: flex;
      align-items: center;
      gap: ${space[4]};
      font-weight: 500;
      color: ${colorMode === "light" ? colors.gray[3] : colors.gray[1]};
      padding-bottom: ${space[2]};
    `,
    error: css`
      color: ${colors.red[1]};
      margin-left: auto;
    `,
    inputStyle: css`
      width: 100%;
      height: ${space[12]};
      padding-inline: ${space[4]};
      border: 2px solid
        ${colorMode === "light" ? colors.gray[1] : colors.navy[2]};
      border-radius: ${radii["md"]};
      font-weight: 700;
      color: ${colorMode === "light" ? colors.black[1] : "white"};
      background-color: ${colorMode === "light" ? "white" : colors.navy[1]};

      &:focus-visible {
        outline-color: ${colors.purple[1]};
      }
    `,
    inputError: css`
      border-color: ${colors.red[1]};
    `,
  };
};
