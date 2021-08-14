import { combineReducers } from "redux";
import { commonReducer } from "./common.reducer";
import { userReducer } from "./user.reducer";
import { authReducer } from "./auth.reducer";
import { agoraVideoReducer } from "./agora.video.reducer";
import { agoraChatReducer } from "./agora.chat.reducer";
import { agoraPollsReducer } from "./agora.polls.reducer";
import { userListReducer } from "./user.list.reducer";
import { experienceControlReducer } from "./experience.control.reducer";
import { agoraActionsReducer } from "./agora.actions.reducer";
import { agoraScreenShareReducer } from "./agora.screenshare";
import { agoraWhiteboardReducer } from "./agora.whiteboard";

export const Reducers = combineReducers({
  users: userReducer,
  common: commonReducer,
  auth: authReducer,
  agoraVideo: agoraVideoReducer,
  agoraChat: agoraChatReducer,
  agoraPolls: agoraPollsReducer,
  userList: userListReducer,
  experienceControl: experienceControlReducer,
  agoraScreenShare: agoraScreenShareReducer,
  agoraActions: agoraActionsReducer,
  agoraWhiteboard: agoraWhiteboardReducer,
});
