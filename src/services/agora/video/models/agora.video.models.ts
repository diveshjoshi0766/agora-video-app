import {
  ICameraVideoTrack,
  IMicrophoneAudioTrack,
  UID,
} from "agora-rtc-sdk-ng";

export interface ILocalTracks {
  videoTrack: ICameraVideoTrack;
  audioTrack: IMicrophoneAudioTrack;
}

export interface IMediaStatus {
  audio: boolean;
  video: boolean;
}

export interface IAgoraUser {
  id: UID;
  mediaType: string;
  isLocalClient: boolean;
}
