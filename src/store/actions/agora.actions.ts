import {
  CHAT_RECEIVED,
  CHAT_USER_ADDED,
  CHAT_USER_REMOVED,
  HOST_ACTION_ADD,
  POLL_ADD,
  SCREEN_SHARE,
  STREAM_ADDED,
  STREAM_REMOVED,
  STREAM_STATUS_CHANGE,
  WHITEBOARD_ADD,
} from "../action.type";
import { IAgoraUser } from "../../services/agora/video/models/agora.video.models";

export const NewStreamAdded = (data: IAgoraUser) => ({
  type: STREAM_ADDED,
  payload: { data },
});

export const StreamStatusChanged = (data: any) => ({
  type: STREAM_STATUS_CHANGE,
  payload: { data },
});

export const StreamRemoved = (data: any) => ({
  type: STREAM_REMOVED,
  payload: { data },
});

export const NewChatUserAdded = (data: any) => ({
  type: CHAT_USER_ADDED,
  payload: { data },
});

export const ChatUserRemoved = (data: any) => ({
  type: CHAT_USER_REMOVED,
  payload: { data },
});

export const NewMessageReceived = (data: any) => ({
  type: CHAT_RECEIVED,
  payload: { data },
});

export const NewPollAdd = (data: any) => ({
  type: POLL_ADD,
  payload: { data },
});

export const ScreenShareAdd = (data: any) => ({
  type: SCREEN_SHARE,
  payload: { data },
});

export const NewActionAdded = (data: any) => ({
  type: HOST_ACTION_ADD,
  payload: { data },
});

export const NewWhiteboardStarted = (data: any) => ({
  type: WHITEBOARD_ADD,
  payload: { data },
});
