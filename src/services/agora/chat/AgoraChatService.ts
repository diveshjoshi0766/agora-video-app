import React from 'react'
import ReactDOM from "react-dom"
import AgoraRTM, { RtmChannel, RtmClient } from "agora-rtm-sdk";
import { Store } from "../../../store";
import AgoraConstants from "../utils/AgoraConstants";
import { generateRtmToken } from "./agora-chat-token-service/AgoraChatTokenService";
import {
  ChatUserRemoved,
  NewActionAdded,
  NewChatUserAdded,
  NewMessageReceived,
  NewPollAdd,
  StreamStatusChanged,
} from "../../../store/actions/agora.actions";
import { UiUtils } from "../../../utils/UiUtils";
import {
  ChatDisabledForRoles,
  FreeRoamDisabledForRoles,
  SetHostTakeover,
  TeleportDisabledForRoles,
} from "../../../store/actions/experience.control.actions";
import * as AgoraVideoService from "../video/AgoraVideoService";
import { ITextMessageBlock } from "./models/agora.chat.models";

const client: RtmClient = AgoraRTM.createInstance(AgoraConstants.APP_ID);
var count = 1;
const uid: any = localStorage.getItem(`${count}`);
console.log(uid)
count++;
const channel: RtmChannel = client.createChannel("demoChannel");

const addChatBox = (message: any) => {
  const msg: any = document.getElementById("msg")
  msg.appendChild(document.createElement('div')).append(message)
}

export const initChat = async () => {
  client.on("ConnectionStateChanged", (state, reason) => {
    console.log(state, reason);
  });
  try {
    console.log(uid);
    const token = generateRtmToken(uid.toString());
    // const token = "";
    console.log(token);
    await client.login({ uid: uid.toString(), token });
    await channel.join();
    console.log("after")
    Store.dispatch(
      NewChatUserAdded({
        id: uid,
        color: UiUtils.getRandomColor(),
      })
    );
  } catch (e) {
    console.log(e);
  }
  registerListeners();
  await getAllMembers();
};
// export var chatMessages: any
// export var chatMessagesFrom: any

export const sendChannelMessage = async (message: any) => {
  // const elementToSend =  React.createElement(
  //   "div",
  //   {style: {color: "red"}, id: "messageFromChannel", className: "ChannelMessageClass"},
  //   "hello",
  //   )

  //   ReactDOM.render(React.createElement(elementToSend), document.getElementsByClassName("msg")) 

  const someElement = document.querySelector(".msg");
  someElement?.appendChild(document.createElement('div')).append(message)
}


export const sendMessageToChannel = async (message: any) => {
  try{
  if (channel != null) {
    await channel
      .sendMessage({ text: message.toString() })
      .then(() => {
      // alert(uid + " said: " + message);
      sendChannelMessage(message)
      console.log(uid+ " said " + message)
    });
    Store.dispatch(
      NewMessageReceived({
        messages: [{ data: { text: message, blob: "" }, messageType: "TEXT" }],
        author: uid,
        time: Date.now(),
      })
    );
    // alert(uid + " said: " + message)
  }
  }
  catch(error){
    alert(error)
  }
};

export const sendActionMessageToChannel = async (message: any) => {
  if (channel !== null) {
    await channel
      .sendMessage({
        text: JSON.stringify(message),
      })
      .then(() => 
      console.log("action message sent"));
  }
  handleActionMessage(JSON.stringify(message));
};

const handleActionMessage = (message: any) => {
  const messageData = JSON.parse(message);
  switch (messageData.type) {
    case "TEXT_MESSAGE":
      console.log(messageData.data, "haha");
      Store.dispatch(NewMessageReceived(messageData.data));
      console.log(message)
      break;
    case "POLL":
      Store.dispatch(NewPollAdd(messageData));
      break;
    case "HOST_ACTION":
      Store.dispatch(NewActionAdded(messageData.data));
      break;
    case "DISABLE_CHAT_PERMISSION":
      Store.dispatch(ChatDisabledForRoles(messageData.data));
      break;
    case "DISABLE_FREE_ROAM":
      Store.dispatch(FreeRoamDisabledForRoles(messageData.data));
      break;
    case "DISABLE_TELEPORTATION":
      Store.dispatch(TeleportDisabledForRoles(messageData.data));
      break;
    case "HOST_TAKEOVER":
      Store.dispatch(SetHostTakeover(messageData.data));
      break;
    case "MUTE_USER":
      Store.dispatch(
        StreamStatusChanged({
          id: messageData.id,
          mediaType: "audio",
          audioStatus: false,
        })
      );
      console.log("MUTE_USER")
      if (uid === messageData.id) {
        AgoraVideoService.muteAudioLocalClient();
      }
      break;
    case "CAMERA_OFF_USER":
      Store.dispatch(
        StreamStatusChanged({
          id: messageData.id,
          mediaType: "video",
          videoStatus: false,
        })
      );
      console.log(messageData.id)
      console.log("CAMERA_OFF_USER")
      if (uid === messageData.id) {
        AgoraVideoService.muteVideoLocalClient();
      }
      break;
  }
};

const registerListeners = () => {
  channel.on("ChannelMessage", async (message, memberId) => {
    switch (message.messageType) {
      case "TEXT":
        sendChannelMessage(message.text);
        console.log(message.messageType)
        console.log(message.text)
        
        handleActionMessage(message.text);
        break;
      case "IMAGE":
        const blob = await client.downloadMedia(message.mediaId);
        const blobUrl = URL.createObjectURL(blob);

        const messageItem: ITextMessageBlock = {
          messageType: "IMAGE",
          data: {
            text: "Media message",
            blob: blobUrl,
          },
        };
        Store.dispatch(
          NewMessageReceived({
            messages: [messageItem],
            author: memberId,
            time: Date.now(),
            channel: message.description,
          })
        );
        break;
    }
  });

  channel.on("MemberJoined", (memberID) => {
    Store.dispatch(
      NewChatUserAdded({ id: memberID, color: UiUtils.getRandomColor() })
    );
  });

  channel.on("MemberLeft", (memberID) => {
    Store.dispatch(ChatUserRemoved({ id: memberID }));
  });
};

export const sendFileMessageToChannel = async (messageChannel: any, fileMessage: any) => {
  console.log(messageChannel + " message file " + fileMessage)
  const fileToDataUri = (file: any) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        resolve(event.target.result);
      };
      reader.readAsDataURL(file);
    });

  const dataURLToBlob = (dataUrl: any) => {
    const arr = dataUrl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bStr = atob(arr[1]);
    let n = bStr.length;

    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bStr.charCodeAt(n);
    }

    return new Blob([u8arr], { type: mime });
  };

  const convertImageToBlob = async (file: any) => {
    const imageDataURL = await fileToDataUri(file);
    return dataURLToBlob(imageDataURL);
  };

  if (channel != null) {
    for (const file of fileMessage) {
      const blob: Blob = await convertImageToBlob(file);
      try {
        const mediaMessage = await client.createMediaMessageByUploading(blob, {
          messageType: "IMAGE",
          fileName: "some.jpg",
          description: messageChannel,
        });
        await channel.sendMessage(mediaMessage);
        const blobUrl = URL.createObjectURL(blob);
        Store.dispatch(
          NewMessageReceived({
            messages: [
              {
                data: { text: file.description, blob: blobUrl },
                messageType: "IMAGE",
              },
            ],
            author: uid,
            time: Date.now(),
            channel: messageChannel,
          })
        );
      } catch (e) {
        console.log(e.message);
      }
    }
  }
};

const getAllMembers = async () => {
  const members = await channel.getMembers();
  members
    .filter((member) => member !== uid)
    .forEach((member) =>
      Store.dispatch(
        NewChatUserAdded({
          id: member,
          color: UiUtils.getRandomColor(),
        })
      )
    );
};
 // document.getElementsByClassName("msg").appendChild(document.createElement('div')).append("Message has been received by: " + peerId + " Message: " + peerMessage)