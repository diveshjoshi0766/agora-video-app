import { IState, IAction } from "../state.interface";
import { HOST_ACTION_ADD } from "../action.type";

const initialAuthState: IState<any> = {
  loading: false,
  loaded: false,
  error: false,
  data: { temp: "data" },
};

export const agoraActionsReducer = function (
  state = initialAuthState,
  action: IAction
): any {
  const { type, payload } = action;

  switch (type) {
    case HOST_ACTION_ADD: {
      const newAction = payload.data;
      return {
        ...state,
        data: newAction,
      };
    }

    default:
      return state;
  }
};
