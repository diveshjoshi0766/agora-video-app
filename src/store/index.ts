import { createStore, applyMiddleware, compose } from "redux";
import logger from "redux-logger";
import promise from "redux-promise-middleware";
import { Reducers } from "./reducers";

// @ts-ignore
export const Store = createStore(
  Reducers,
  {},
  compose(applyMiddleware(logger, promise))
);

export type AppState = ReturnType<typeof Reducers>;
