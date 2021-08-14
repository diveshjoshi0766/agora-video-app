import { USER_STATUS } from "../action.type";
import {
  USER_FETCH_PENDING,
  USER_FETCH_FULFILLED,
  USER_FETCH_REJECTED,
  USER_LOGOUT,
} from "../action.type";
import { IState, IAction } from "../state.interface";

export type UserState = IState<any>;

const initaialUserState: UserState = {
  loading: false,
  loaded: false,
  error: false,
  data: null,
};

export const userReducer = function (
  state = initaialUserState,
  action: IAction
): UserState {
  const { type, payload } = action;
  switch (type) {
    case USER_FETCH_PENDING: {
      return { ...state, loading: true };
    }
    case USER_FETCH_FULFILLED: {
      return {
        ...state,
        loading: false,
        loaded: true,
        data: payload.data.data,
      };
    }

    case USER_FETCH_REJECTED: {
      return { ...state, loading: false, loaded: false, error: true };
    }
    case USER_LOGOUT: {
      localStorage.clear();
      return { ...state, loaded: false, data: [] };
    }

    case USER_STATUS: {
      const preState: any = state.data;
      for (var i in preState) {
        if (preState[i].id === payload.user_id) {
          const data = payload.status ? 1 : 0;
          preState[i].status = data;
          break;
        }
      }
      return { ...state, loading: false, loaded: false, error: true };
    }
    default:
      return state;
  }
};
