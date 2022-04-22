import { atom } from "recoil";

export const projectState = atom({
  key: "projectState",
  default: false,
});

export const projectTypeState = atom({
  key: "projectTypeState",
  default: "dropIn",
});