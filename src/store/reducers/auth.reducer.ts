import { IState, IAction } from "../state.interface";
import { SAVE_AUTH_DATA } from "../action.type";
import jwt_decode from "jwt-decode";
import { StringUtils } from "../../utils/StringUtils";

const initialAuthState: IState<any> = {
  loading: false,
  loaded: false,
  error: false,
  data: [],
};

export const authReducer = function (
  state = initialAuthState,
  action: IAction
): any {
  const { type, payload } = action;
  switch (type) {
    case SAVE_AUTH_DATA: {
      const getToken = localStorage.getItem("token");
      const _payload: any = getToken
        ? {
            auth_data: jwt_decode(getToken as string),
          }
        : payload;
      _payload.auth_data["fid"] = StringUtils.getStringHash(
        _payload.auth_data.email
      );
      return {
        ...state,
        loading: false,
        loaded: true,
        data: _payload,
      };
    }
    default:
      return state;
  }
};
