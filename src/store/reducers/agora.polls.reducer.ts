import { IState, IAction } from "../state.interface";
import { POLL_ADD } from "../action.type";

const initialAuthState: IState<any> = {
  loading: false,
  loaded: false,
  error: false,
  data: {
    polls: {},
  },
};

export const agoraPollsReducer = function (
  state = initialAuthState,
  action: IAction
): any {
  const { type, payload } = action;

  switch (type) {
    case POLL_ADD: {
      const newPoll = payload.data;
      const polls = JSON.parse(JSON.stringify(state.data.polls));
      polls[newPoll.id] = newPoll;
      const data = { ...state.data };
      data.polls = polls;
      return {
        ...state,
        data: data,
      };
    }

    default:
      return state;
  }
};
