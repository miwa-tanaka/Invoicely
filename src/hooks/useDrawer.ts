import { useSetRecoilState, useRecoilValue } from "recoil";
import { drawerOpenState } from "@/store/drawerOpenState";

export const useDrawer = () => {
  const isOpen = useRecoilValue(drawerOpenState);
  const setDrawerOpen = useSetRecoilState(drawerOpenState);

  const onOpen = () => setDrawerOpen(true);
  const onClose = () => setDrawerOpen(false);

  return { isOpen, onOpen, onClose };
};
