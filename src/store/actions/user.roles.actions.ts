import {
  USER_LIST_FETCH_FULFILLED,
  USER_LIST_FETCH_REJECTED,
} from "../action.type";
// import { StringUtils } from "../../utils/StringUtils";

export const UserListFetchFulfilled = (data: any) => {
  const users = {};
  console.log(data, "haha");
  data.users.forEach((user: any) => {
    // const fid: any = StringUtils.getStringHash(user.email);
    // users[fid] = { ...user, fid };
  });
  data.users = users;
  return {
    type: USER_LIST_FETCH_FULFILLED,
    payload: { data },
  };
};

export const UserListFetchRejected = () => ({
  type: USER_LIST_FETCH_REJECTED,
});
