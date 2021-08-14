import { joinChannel } from "../../services/agora/video/AgoraVideoService";
import { muteAudioLocalClient, muteVideoLocalClient, leaveCall } from "../../services/agora/video/AgoraVideoService";
import "./Options.module.css";
import {
  faMicrophone,
  faVideo,
  faDesktop,
  faSignOutAlt,
  faVolumeMute,
  faVideoSlash,
  faGripVertical,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { joinChannelForScreenShare, stopScreenShare, startScreenShare} from "../../services/agora/screen-share/AgoraScreenShareService";
import Chat from "../Chat/Messenger";
import { initChat, sendActionMessageToChannel } from "../../services/agora/chat/AgoraChatService";
import { useEffect, useState } from "react";

const Options = () => {

//joining the channel
  // var uid = ;
  // uid.then((ele) =>{
  //   console.log(ele)
  // })

//initializing chat
  useEffect(() => {
    initChat();
    joinChannelForScreenShare();
    joinChannel()
  }, [])
  
const [audio, setAudio] = useState(false)
//function to muteAudio & unmuteAudio
  function muteAudio(){
    muteAudioLocalClient();
    setAudio(!audio)
  }

const [video, setVideo] = useState(false)
//function to muteVideo &  unmuteVideo
  function muteVideo(){
    muteVideoLocalClient();
    setVideo(!video)
  }


//screen sharing start on clicking button
const [screenShare, setScreenShare] = useState(false)
  function shareScreen(){
    startScreenShare();
    setScreenShare(!screenShare)
  }

//exit video conference
  function exit(){
    leaveCall();
    stopScreenShare()
  }

function mute_user() {
  sendActionMessageToChannel({type: "MUTE_USER", id: `${localStorage.getItem("2")}`})
}

function mute_video() {
  sendActionMessageToChannel({type: "CAMERA_OFF_USER", id: `${localStorage.getItem("2")}`})
  sendActionMessageToChannel({type: "CAMERA_OFF_USER", id: `${localStorage.getItem("3")}`})
  sendActionMessageToChannel({type: "CAMERA_OFF_USER", id: `${localStorage.getItem("4")}`})
  sendActionMessageToChannel({type: "CAMERA_OFF_USER", id: `${localStorage.getItem("5")}`})
  sendActionMessageToChannel({type: "CAMERA_OFF_USER", id: `${localStorage.getItem("6")}`})
  sendActionMessageToChannel({type: "CAMERA_OFF_USER", id: `${localStorage.getItem("7")}`})
  sendActionMessageToChannel({type: "CAMERA_OFF_USER", id: `${localStorage.getItem("8")}`})
  sendActionMessageToChannel({type: "CAMERA_OFF_USER", id: `${localStorage.getItem("9")}`})
  sendActionMessageToChannel({type: "CAMERA_OFF_USER", id: `${localStorage.getItem("10")}`})
  sendActionMessageToChannel({type: "CAMERA_OFF_USER", id: `${localStorage.getItem("1")}`})
}

  return (
    <>
      <div className="container wrapper">
{/*Main Video Screen*/}
        <div className="main-container">
          <div className="row my-4">
              <div className="col-sm-4">
              <div className="sizing">
                <div id="local_stream" className="local_stream" style={{ width: "100%", height: "38vh", display: "flex"}}></div>
                </div>
              </div>
              <div className="col-sm-4">
              <div className="sizing" style={{height: "38vh"}}>
                <div id="remote_video_" style={{ margin:'0px' ,width: "100%", height: "38vh", display: "flex"}}>
                </div>
              </div>
              </div>
          </div>

          <div className="row" style={{height: "38vh"}}>
              <div className="col-sm-4"  style={{height: "fit-content"}}>
              <div className="sizing" style={{height: "38vh"}}>
                <div id="screen-share" className="screen-share" style={{ width: "100%", height: "38vh", display: "flex"}}></div>
                </div>
              </div>
              <div className="col-sm-4"  style={{height: "fit-content"}}>
              <div className="sizing" style={{height: "38vh"}}>
                <div
                    id="remote_video_"
                    style={{ margin:'0px' ,width: "100%", height: "38vh", display: "flex"}}
                >
                </div>
              </div>
              </div>
              <div className="col-sm-4"  style={{height: "fit-content"}}>
              <div className="sizing" style={{height: "38vh"}}>
                <div id="remote_video_" className="remote_video_" style={{ width: "100%", height: "38vh", display: "flex"}}></div>
                </div>
              </div>
          </div>
        </div>


{/*Footer*/}

        <div className="meeting-footer" style={{marginTop: "6vh"}}>
        <div
            className={"meeting-icons active" + (audio === false ? "" : "active")}>
            <FontAwesomeIcon
              icon={faMicrophone}
              onClick={muteAudio}
            />
          </div>
          <div
            className={"meeting-icons active" + (video === false ? "" : "active")}>
            <FontAwesomeIcon 
            icon={faVideo} 
            onClick={muteVideo}
            />
          </div>
          <div
            className={"meeting-icons active off-screenShare" + (screenShare === false ? "" : "active")} id="screenSharing">
            <FontAwesomeIcon 
            icon={faDesktop} 
            onClick={shareScreen}
            />
          </div>
          <div
            className={"meeting-icons active"}>
          <FontAwesomeIcon 
            icon={faSignOutAlt} 
            onClick={exit}
          />
          </div>

          <div className={"meeting-icons"}>
          <FontAwesomeIcon 
            icon={faGripVertical} 
            onClick={exit}
          />
          </div>

          <div
            className={"meeting-icons active"}>
            {/* MUTE_USER */}
          <FontAwesomeIcon 
            onClick={mute_user}
            icon={faVolumeMute} 
          />
          </div>
          <div
            className={"meeting-icons active"}>
            {/* MUTE_USER */}
          <FontAwesomeIcon 
            onClick={mute_video}
            icon={faVideoSlash} 
          />
          </div>
          <div className="meeting-icons" id="chat-box">
          <Chat></Chat>
          </div>
        </div>

        </div>

    </>
  )
};

export default Options;
