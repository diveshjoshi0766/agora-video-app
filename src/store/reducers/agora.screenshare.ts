import { IState, IAction } from "../state.interface";
import { SCREEN_SHARE } from "../action.type";

const initialAuthState: IState<any> = {
  loading: false,
  loaded: false,
  error: false,
  data: {
    author: "",
    sharingScreen: false,
  },
};

export const agoraScreenShareReducer = function (
  state = initialAuthState,
  action: IAction
): any {
  const { type, payload } = action;

  switch (type) {
    case SCREEN_SHARE: {
      const newData = payload.data;
      return {
        ...state,
        data: Object.assign({}, state.data, newData),
      };
    }

    default:
      return state;
  }
};
