import { IState, IAction } from "../state.interface";
import {
  CHAT_RECEIVED,
  CHAT_USER_ADDED,
  CHAT_USER_REMOVED,
} from "../action.type";

const initialAuthState: IState<any> = {
  loading: false,
  loaded: false,
  error: false,
  data: {
    users: {},
    messageSegments: [],
  },
};

export const agoraChatReducer = function (
  state = initialAuthState,
  action: IAction
): any {
  const { type, payload } = action;

  switch (type) {
    case CHAT_USER_ADDED: {
      const newUser = payload.data;
      const users = JSON.parse(JSON.stringify(state.data.users));
      users[newUser.id] = newUser;
      const data = { ...state.data };
      data.users = users;
      return {
        ...state,
        data: data,
      };
    }

    case CHAT_USER_REMOVED: {
      const id = payload.data.id;
      const users = JSON.parse(JSON.stringify(state.data.users));
      delete users[id];
      const data = { ...state.data };
      data.users = users;
      return {
        ...state,
        data: data,
      };
    }

    case CHAT_RECEIVED: {
      const newMessage = payload.data;
      const messageSegments = JSON.parse(
        JSON.stringify(state.data.messageSegments)
      );
      if (messageSegments.length > 0) {
        const lastMessageSegment = messageSegments[messageSegments.length - 1];
        if (lastMessageSegment.author === newMessage.author) {
          lastMessageSegment.messages.push(newMessage.messages[0]);
        } else {
          messageSegments.push(newMessage);
        }
      } else {
        messageSegments.push(newMessage);
      }
      const data = { ...state.data };
      data.messageSegments = messageSegments;
      return {
        ...state,
        data: data,
      };
    }

    default:
      return state;
  }
};
