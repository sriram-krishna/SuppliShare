import { PublicClientApplication, EventType } from "@azure/msal-browser";
import { msalConfig } from "./authConfig";

const msalInstance = new PublicClientApplication(msalConfig);

export const login = () => {
};

export const logout = () => {
};

export const getUserDetails = () => {
};