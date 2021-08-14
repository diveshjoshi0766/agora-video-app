import { IState, IAction } from "../state.interface";

const initialRolesState: IState<any> = {
  loading: false,
  loaded: false,
  error: false,
  data: [],
};

export const commonReducer = function (
  state = initialRolesState,
  action: IAction
): any {
  return state;
};
