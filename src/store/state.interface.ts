export interface IState<T> {
  loading: boolean;
  loaded: boolean;
  error: boolean;
  data: T;
}

export interface DataProps {
  loading: boolean;
  loaded: boolean;
  error: boolean;
  data: {
    limit: number;
    offset: number;
    users: [];
  };
}

export interface IAction {
  type: string;
  payload: any;
}
