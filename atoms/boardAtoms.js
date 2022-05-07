import { atom } from "recoil";

export const boardState = atom({
  key: "boardState",
  default: false,
});

export const boardTypeState = atom({
  key: "boardTypeState",
  default: "dropIn",
});

export const isNewwBoard = atom({
  key: "osNewBoard",
  default: true,
});