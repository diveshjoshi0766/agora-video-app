import { RtmRole } from "agora-access-token";
import AgoraConstants from "../../utils/AgoraConstants";

const agoraAccessToken = require("agora-access-token");

export const generateRtmToken = (uid: any) => {
  const expirationTimeInSeconds = 86400;
  const currentTimestamp = Math.floor(Date.now() / 1000);

  const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;
  return agoraAccessToken.RtmTokenBuilder.buildToken(
    AgoraConstants.APP_ID,
    AgoraConstants.APP_CERT,
    uid,
    RtmRole,
    privilegeExpiredTs
  );
};
