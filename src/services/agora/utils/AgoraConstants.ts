const randomId = () => {
  const max32 = Math.pow(2, 32) - 1;
  const x =
    Math.floor(Math.floor(Date.now() / 1000) + Math.random() * (max32 - 1)) + 1;
  if (x > 2147483647) {
    return x - 2147483647;
  } else {
    return x;
  }
};

const AppConstants = {
  UID: randomId(),
  APP_ID: "b7cdd4b7470c40dcadee1eab6f4810f8",
  APP_CERT: "c470429d8cf74f749df91159b59f20e0",
  TOKEN:
    "006b9134f2af29c40b3af1db16da153b34dIAA442uqcSsLqRvpZDWtVtzHkRWxrqo5ELVI7Bv5TxRcFX3f3r8AAAAAEAB+PjEWaGavYAEAAQBnZq9g",
  CHANNEL: "gc1",
  SCREEN_SHARE_CHANNEL: "gc1_screen_share",
  JSON_KEY: "lPnwJ_JSON",
};
export default AppConstants;
