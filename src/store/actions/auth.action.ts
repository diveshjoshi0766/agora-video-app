import { SAVE_AUTH_DATA } from "../action.type";

export const saveAuthData = (token: any) => ({
  type: SAVE_AUTH_DATA,
  payload: { token },
});
