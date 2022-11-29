import { atom } from "recoil";

export const dayAtom = atom<Date>({
  key: "day",
  default: new Date(),
});

export const createAtom = atom<boolean>({
  key:"createtodoopen",
  default: false,
});