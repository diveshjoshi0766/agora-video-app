import { USER_LOGOUT, USER_STATUS } from "../action.type";

export const LogOut = () => ({
  type: USER_LOGOUT,
});

export const UserStatus = (values: object) => ({
  type: USER_STATUS,
  payload: values,
});
