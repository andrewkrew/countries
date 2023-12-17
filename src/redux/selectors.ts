import { RootState } from "./store";

export const themeSelector = (state: RootState) => state.theme;
export const authSelector = (state: RootState) => state.auth;
export const countriesSelector = (state: RootState) => state.countries;