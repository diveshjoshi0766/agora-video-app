// @ts-ignore
import { RtcRole } from "agora-access-token";
import AgoraConstants from "../../utils/AgoraConstants";

const agoraAccessToken = require("agora-access-token");

export const generateRtcToken = (channelName: any, uid: any) => {
  const role = RtcRole.PUBLISHER;
  const expirationTimeInSeconds = 86400;
  const currentTimestamp = Math.floor(Date.now() / 1000);

  const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

  return agoraAccessToken.RtcTokenBuilder.buildTokenWithUid(
    AgoraConstants.APP_ID,
    AgoraConstants.APP_CERT,
    channelName,
    uid,
    role,
    privilegeExpiredTs
  );
};
