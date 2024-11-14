import { atom } from "recoil";

export const itemDetailOpenState = atom<boolean>({
  key: "itemDetailOpenState",
  default: false,
});
