import { IState, IAction } from "../state.interface";
import { WHITEBOARD_ADD } from "../action.type";

const initialAuthState: IState<any> = {
  loading: false,
  loaded: false,
  error: false,
  data: {
    author: "",
    room: {},
    whiteboardEnabled: false,
  },
};

export const agoraWhiteboardReducer = function (
  state = initialAuthState,
  action: IAction
): any {
  const { type, payload } = action;

  switch (type) {
    case WHITEBOARD_ADD: {
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
