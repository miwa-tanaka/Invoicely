import { useSetRecoilState, useRecoilValue } from "recoil";
import { itemDetailOpenState } from "@/store/itemDetailOpenState";

export const useItemDetail = () => {
  const isOpen = useRecoilValue(itemDetailOpenState);
  const setDrawerOpen = useSetRecoilState(itemDetailOpenState);

  const onOpen = () => setDrawerOpen(true);
  const onClose = () => setDrawerOpen(false);

  return { isOpen, onOpen, onClose };
};
