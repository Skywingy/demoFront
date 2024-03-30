import packageJson from "../package.json";
// import { PRO_ROOT } from "./env";

export const DEBUG = process.env.NODE_ENV === "development";
export const APP_NAME = "Front-END";

// export const API_ROOT = DEBUG ? DEV_URL : PRO_URL;
// export const API_ROOT = "http://192.168.0.114:5140/";
export const API_ROOT = "http://localhost:3030/";
export const VERSION = packageJson.version;
export const YEAR = () => {
  return new Date().getFullYear();
};
export const DATE_FORMAT = "yyyy-MM-dd HH:mm:ss";
export const timeOut = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
