import { atom } from "recoil";

export const projectState = atom({
  key: "projectState",
  default: false,
});

export const projectTypeState = atom({
  key: "projectTypeState",
  default: "dropIn",
});

export const getProjectsState = atom({
  key: "getProjectsState",
  default: [],
});


export const isNewProject = atom({
  key: "isNewProject",
  default: true,
});

export const getBoardsState = atom({
  key: "getBoardsState",
  default: {},
});

export const projectIdState = atom({
  key: "projectIdState",
  default: "",
});