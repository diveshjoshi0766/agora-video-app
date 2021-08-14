import AgoraRTC, {
  IAgoraRTCClient,
  IAgoraRTCRemoteUser,
  UID,
} from "agora-rtc-sdk-ng";
import { Store } from "../../../store";
import { generateRtcToken } from "./agora-token-service/AgoraTokenService";
import AgoraConstants from "../utils/AgoraConstants";
import {
  IAgoraUser,
  ILocalTracks,
  IMediaStatus,
} from "./models/agora.video.models";
import {
  NewStreamAdded,
  StreamRemoved,
  StreamStatusChanged,
} from "../../../store/actions/agora.actions";
// import randomstring from "randomstring";

var count = 1;
const uid: any = localStorage.getItem(`${count}`);
console.log(uid)
count++;
export var numberOfParticipants = count;
// console.log(uid)
// var myMap = new Map();
// const uid = Date.now().toString();

// const uid = randomstring.generate()
// console.log(uid)
// myMap.put()
// const uid: UID = "";
const client: IAgoraRTCClient = AgoraRTC.createClient({
  mode: "rtc",
  codec: "vp8",
});
const localTracks: any = {
  videoTrack: null,
  audioTrack: null,
};
const mediaStatus: IMediaStatus = { audio: false, video: false };
const token: string = generateRtcToken(AgoraConstants.CHANNEL, uid);

export const joinChannel = async () => {
  client.on(
    "user-published",
    (user: IAgoraRTCRemoteUser, mediaType: string) => {
      subscribe(user, mediaType);
    }
  );
  client.on("user-unpublished", (user: IAgoraRTCRemoteUser, mediaType) => {
    const id = user.uid;
    mediaType === "video"
      ? dispatchStreamStatusChange({
          id: id,
          mediaType: "video",
          videoStatus: false,
        })
      : dispatchStreamStatusChange({
          id: id,
          mediaType: "audio",
          audioStatus: false,
        });
  });

  client.on("user-left", (user: IAgoraRTCRemoteUser, reason: string) => {
    dispatchStreamRemoved({ id: user.uid });
  });

  await client.join(AgoraConstants.APP_ID, AgoraConstants.CHANNEL, token, uid);

  [localTracks.audioTrack, localTracks.videoTrack] = await Promise.all([
    AgoraRTC.createMicrophoneAudioTrack(),
    AgoraRTC.createCameraVideoTrack(),
  ]);

  dispatchNewStreamAdded({
    id: uid,
    mediaType: "audio",
    isLocalClient: true,
  })
  dispatchNewStreamAdded({
    id: uid,
    mediaType: "video",
    isLocalClient: true,
  });

  mediaStatus.audio = localTracks.audioTrack != null;
  mediaStatus.video = localTracks.videoTrack != null;

  // await muteAudioLocalClient();
  // await muteVideoLocalClient();

  localTracks.videoTrack.play("local_stream");
  await client.publish(Object.values(localTracks));
  return uid;
};

export const muteAudioLocalClient = async () => {
  mediaStatus.audio = !mediaStatus.audio;
  await localTracks.audioTrack.setEnabled(mediaStatus.audio);
  dispatchStreamStatusChange({
    id: uid,
    mediaType: "audio",
    audioStatus: mediaStatus.audio,
  });
};

export const muteVideoLocalClient = async () => {
  mediaStatus.video = !mediaStatus.video;
  await localTracks.videoTrack.setEnabled(mediaStatus.video);
  dispatchStreamStatusChange({
    id: uid,
    mediaType: "video",
    videoStatus: mediaStatus.video,
  });
};

const subscribe = async (user: any, mediaType: any) => {
  const uid = user.uid;
  await client.subscribe(user, mediaType);

  if (mediaType === "video") {
    user.videoTrack.play(`remote_video_`);
    dispatchNewStreamAdded({
      id: user.uid,
      mediaType: "video",
      isLocalClient: false,
    });
  }
  if (mediaType === "audio") {
    user.audioTrack.play();
    dispatchNewStreamAdded({
      id: user.uid,
      mediaType: "audio",
      isLocalClient: false,
    });
  }
};

const dispatchNewStreamAdded = (data: IAgoraUser) => {
  Store.dispatch(NewStreamAdded(data));
};

const dispatchStreamStatusChange = (data: any) => {
  Store.dispatch(StreamStatusChanged(data));
};

const dispatchStreamRemoved = (data: any) => {
  Store.dispatch(StreamRemoved(data));
};


export const leaveCall: any = async () => {
  // localTracks.audioTrack.close();
  // localTracks.videoTrack.close();

  await client.leave();
}