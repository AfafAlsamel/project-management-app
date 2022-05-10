import { atom } from "recoil";

export const boardState = atom({
  key: "boardState",
  default: [{}],
});

export const boardTypeState = atom({
  key: "boardTypeState",
  default: "dropIn",
});

export const isNewwBoard = atom({
  key: "osNewBoard",
  default: true,
});