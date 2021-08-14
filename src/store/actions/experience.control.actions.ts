import {
  CHAT_DISABLED,
  FREE_ROAM_DISABLED,
  HOST_TAKEOVER,
  SET_CURRENT_ZONE,
  TELEPORT_DISABLED,
} from "../action.type";

export const ChatDisabledForRoles = (data: any) => ({
  type: CHAT_DISABLED,
  payload: { data },
});

export const FreeRoamDisabledForRoles = (data: any) => ({
  type: FREE_ROAM_DISABLED,
  payload: { data },
});

export const TeleportDisabledForRoles = (data: any) => ({
  type: TELEPORT_DISABLED,
  payload: { data },
});

export const SetCurrentZone = (data: any) => ({
  type: SET_CURRENT_ZONE,
  payload: { data },
});

export const SetHostTakeover = (data: any) => ({
  type: HOST_TAKEOVER,
  payload: { data },
});
