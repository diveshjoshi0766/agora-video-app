import AgoraRTC, {
  IAgoraRTCClient,
  IAgoraRTCRemoteUser,
  ILocalAudioTrack,
  ILocalVideoTrack,
  UID,
} from "agora-rtc-sdk-ng";
import { Store } from "../../../store";
import { generateRtcToken } from "../video/agora-token-service/AgoraTokenService";
import AgoraConstants from "../utils/AgoraConstants";
import { ScreenShareAdd } from "../../../store/actions/agora.actions";

// const uid: UID = Store.getState().auth.data.fid;
// const uid: any = localStorage.getItem(`growth`);

var count = 1;
const uid: any = localStorage.getItem(`${count}`);
count++;
console.log(uid)

const token: string = generateRtcToken(
  AgoraConstants.SCREEN_SHARE_CHANNEL,
  uid
);
const client: IAgoraRTCClient = AgoraRTC.createClient({
  mode: "rtc",
  codec: "vp8",
});
let localTracks: any = null;

const dispatchScreenShare = (id: any) =>
  Store.dispatch(ScreenShareAdd({ author: id, sharingScreen: true }));
const dispatchStopScreenShare = () =>
  Store.dispatch(ScreenShareAdd({ author: "", sharingScreen: false }));

export const joinChannelForScreenShare = async () => {
  client.on(
    "user-published",
    (user: IAgoraRTCRemoteUser, mediaType: string) => {
      subscribeToScreenShare(user, mediaType);
      console.log(user+'growth')
    }
  );
  client.on(
    "user-unpublished",
  (user: IAgoraRTCRemoteUser, mediaType: string) => {
      dispatchStopScreenShare();
    }
  );
  await client.join(
    AgoraConstants.APP_ID,
    AgoraConstants.SCREEN_SHARE_CHANNEL,
    token,
    uid
  );
};

export const startScreenShare = async () => {
  localTracks = await AgoraRTC.createScreenVideoTrack(
    {
      encoderConfig: "1080p_1",
    },
    "auto"
  );
  await client.publish(localTracks);
  dispatchScreenShare(uid);

  if (localTracks !== null) {
    // @ts-ignore
    localTracks.play("screen-share-here");
  }
};

export const stopScreenShare = async () => {
  await client.unpublish(localTracks);
};

const subscribeToScreenShare = async (user: any, mediaType: any) => {
  await client.subscribe(user, mediaType);
  dispatchScreenShare(user.uid);
  if (mediaType === "video") {
    user.videoTrack.play(`screen-share-here`);
  }
  if (mediaType === "audio") {
    user.audioTrack.play();
  }
};
