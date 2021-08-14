import { IState, IAction } from "../state.interface";
import {
  CHAT_DISABLED,
  FREE_ROAM_DISABLED,
  HOST_TAKEOVER,
  SET_CURRENT_ZONE,
  TELEPORT_DISABLED,
} from "../action.type";

const initialAuthState: IState<any> = {
  loading: false,
  loaded: false,
  error: false,
  data: {
    chatDisabled: [],
    freeRoamDisabled: false,
    teleportationDisabled: false,
    hostTakeover: false,
    recording: false,
    currentZone: "LOB",
  },
};

export const experienceControlReducer = function (
  state = initialAuthState,
  action: IAction
): any {
  const { type, payload } = action;

  switch (type) {
    case CHAT_DISABLED: {
      const newChatPermissions = payload.data;
      const data = { ...state.data };
      data.chatDisabled = newChatPermissions;
      return {
        ...state,
        data: data,
      };
    }
    case FREE_ROAM_DISABLED: {
      const freeRoamDisabled = payload.data;
      const data = { ...state.data };
      data.freeRoamDisabled = freeRoamDisabled;
      return {
        ...state,
        data: data,
      };
    }
    case TELEPORT_DISABLED: {
      const teleportDisabled = payload.data;
      const data = { ...state.data };
      data.teleportationDisabled = teleportDisabled;
      return {
        ...state,
        data: data,
      };
    }

    case HOST_TAKEOVER: {
      const hostTakeover = payload.data;
      const data = { ...state.data };
      data.hostTakeover = hostTakeover;
      return {
        ...state,
        data: data,
      };
    }

    case SET_CURRENT_ZONE: {
      const currentZone = payload.data;
      return {
        ...state,
        data: Object.assign({}, state.data, { currentZone }),
      };
    }

    default:
      return state;
  }
};
