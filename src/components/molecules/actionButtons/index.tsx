import { useState, useEffect, RefObject, useCallback } from "react";
import { Flex, useTheme, useColorMode } from "@chakra-ui/react";
import { css } from "@emotion/react";
import DiscardButton from "@/components/molecules/actionButtons/discardButton";
import CancelButton from "@/components/molecules/actionButtons/cancelButton";
import SaveButton from "@/components/molecules/actionButtons/saveButton";
import SubmitButton from "@/components/molecules/actionButtons/submitButton";

export type actionButtonsProps = {
  onSaveClick: () => void;
  onSubmitClick: () => void;
  onDiscardClick: () => void;
  onCancelClick: () => void;
  formRef: RefObject<HTMLFormElement>;
  state: "new" | "edit";
};

export default function ActionButtons({
  onSaveClick,
  onSubmitClick,
  onDiscardClick,
  onCancelClick,
  formRef,
  state,
}: actionButtonsProps): JSX.Element {
  const { buttonWrapperWithShadow, buttonWrapper } = ActionButtonsStyles();

  const [hasShadow, setHasShadow] = useState(false);

  const checkScroll = useCallback(() => {
    const formElement = formRef.current;
    if (formElement) {
      const scrollTop = formElement.scrollTop;
      const scrollHeight = formElement.scrollHeight;
      const clientHeight = formElement.clientHeight;

      setHasShadow(scrollTop + clientHeight < scrollHeight);
    }
  }, [formRef]);

  useEffect(() => {
    checkScroll();

    const formElement = formRef.current;
    if (formElement) {
      formElement.addEventListener("scroll", checkScroll);
    }

    return () => {
      if (formElement) {
        formElement.removeEventListener("scroll", checkScroll);
      }
    };
  }, [checkScroll, formRef]);

  return (
    <Flex
      css={hasShadow ? buttonWrapperWithShadow : buttonWrapper}
      justify={state === "new" ? "space-between" : "flex-end"}
    >
      <DiscardButton state={state} onClick={onDiscardClick} />
      <Flex align="center" gap={2}>
        <CancelButton state={state} onClick={onCancelClick} />
        <SaveButton state={state} onClick={onSaveClick} />
        <SubmitButton state={state} onClick={onSubmitClick} />
      </Flex>
    </Flex>
  );
}

export const ActionButtonsStyles = () => {
  const { colors, radii, space, breakpoints } = useTheme();
  const { colorMode } = useColorMode();

  const baseButtonWrapper = css`
    justify-content: space-between;
    position: sticky;
    bottom: 0;
    background-color: ${colorMode === "light" ? "white" : colors.black[2]};
    padding: ${space[2]} ${space[4]};
    border-radius: 0 ${radii["2xl"]} ${radii["2xl"]} 0;

    @media screen and (min-width: ${breakpoints["sm"]}) {
      padding: ${space[7]};
    }
  `;

  const shadowStyle = css`
    &::before {
      content: "";
      position: absolute;
      top: -200px;
      left: 0;
      right: 0;
      height: 200px;
      background: linear-gradient(
        to top,
        ${colorMode === "light"
          ? "rgba(211, 211, 211, 0.4)"
          : "rgba(20, 22, 37, 0.8)"},
        ${colorMode === "light"
          ? "rgba(255, 255, 255, 0)"
          : "rgba(20, 22, 37, 0)"}
      );
      z-index: -1;
      pointer-events: none;
    }
  `;

  return {
    buttonWrapperWithShadow: [baseButtonWrapper, shadowStyle],
    buttonWrapper: baseButtonWrapper,
  };
};
