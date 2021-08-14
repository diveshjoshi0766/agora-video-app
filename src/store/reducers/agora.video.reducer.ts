import { IState, IAction } from "../state.interface";
import {
  STREAM_ADDED,
  STREAM_REMOVED,
  STREAM_STATUS_CHANGE,
} from "../action.type";

const initialAuthState: IState<any> = {
  loading: false,
  loaded: false,
  error: false,
  data: {},
};

export const agoraVideoReducer = function (
  state = initialAuthState,
  action: IAction
): any {
  const { type, payload } = action;

  switch (type) {
    case STREAM_ADDED: {
      const newUser = payload.data;
      const users = { ...state.data };
      if (Object.keys(users).includes(newUser.id)) {
        if (newUser.mediaType === "video") users[newUser.id].videoStream = true;
        if (newUser.mediaType === "audio") users[newUser.id].audioStream = true;
      } else {
        users[newUser.id] = {
          id: newUser.id,
          videoStream: newUser.mediaType === "video",
          audioStream: newUser.mediaType === "audio",
          isLocalClient: newUser.isLocalClient,
        };
      }
      return {
        ...state,
        data: Object.assign({}, state.data, users),
      };
    }
    case STREAM_STATUS_CHANGE: {
      const userData = payload.data;
      const users = { ...state.data };

      if (Object.keys(users).includes(userData.id.toString())) {
        if (userData.mediaType === "video")
          users[userData.id].videoStream = userData.videoStatus;
        if (userData.mediaType === "audio")
          users[userData.id].audioStream = userData.audioStatus;
      }
      return {
        ...state,
        data: Object.assign({}, state.data, users),
      };
    }

    case STREAM_REMOVED: {
      const userData = payload.data;
      const users = { ...state.data };
      delete users[userData.id];
      return {
        ...state,
        data: Object.assign({}, users),
      };
    }
    default:
      return state;
  }
};
