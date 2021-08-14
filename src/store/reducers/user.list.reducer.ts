import {
  USER_LIST_FETCH_FULFILLED,
  USER_LIST_FETCH_REJECTED,
} from "../action.type";
import { IState, IAction } from "../state.interface";

export type UserState = IState<any>;

const initialState: UserState = {
  loading: false,
  loaded: false,
  error: false,
  data: {},
};

export const userListReducer = function (
  state = initialState,
  action: IAction
): UserState {
  const { type, payload } = action;
  switch (type) {
    case USER_LIST_FETCH_FULFILLED: {
      return {
        ...state,
        loading: false,
        loaded: true,
        data: payload.data,
      };
    }

    case USER_LIST_FETCH_REJECTED: {
      return { ...state, loading: false, loaded: false, error: true };
    }

    default:
      return state;
  }
};
