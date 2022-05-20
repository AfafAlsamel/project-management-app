import { atom } from "recoil";

export const boardState = atom({
  key: "boardState",
  default: 0,
});

export const boardTypeState = atom({
  key: "boardTypeState",
  default: "dropIn",
});

export const isNewwBoard = atom({
  key: "osNewBoard",
  default: true,
});