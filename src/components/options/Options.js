// import { joinChannel } from "../../services/agora/video/AgoraVideoService";
// import { muteAudioLocalClient, muteVideoLocalClient, leaveCall } from "../../services/agora/video/AgoraVideoService";
// import "./Options.module.css";
// import {
//   faMicrophone,
//   faVideo,
//   faDesktop,
//   faSignOutAlt,
//   faVolumeMute,
//   faVideoSlash,
//   faGripVertical,
// } from "@fortawesome/free-solid-svg-icons"
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { joinChannelForScreenShare, stopScreenShare, startScreenShare} from "../../services/agora/screen-share/AgoraScreenShareService";
// import Chat from "../Chat/Messenger";
// import { initChat, sendActionMessageToChannel } from "../../services/agora/chat/AgoraChatService";
// import { useEffect, useState } from "react";

// const Options = () => {

// //joining the channel
//   // var uid = ;
//   // uid.then((ele) =>{
//   //   console.log(ele)
//   // })

// //initializing chat
//   useEffect(() => {
//     initChat();
//     joinChannelForScreenShare();
//     joinChannel()
//   }, [])
  
// const [audio, setAudio] = useState(false)
// //function to muteAudio & unmuteAudio
//   function muteAudio(){
//     muteAudioLocalClient();
//     setAudio(!audio)
//   }

// const [video, setVideo] = useState(false)
// //function to muteVideo &  unmuteVideo
//   function muteVideo(){
//     muteVideoLocalClient();
//     setVideo(!video)
//   }


// //screen sharing start on clicking button
// const [screenShare, setScreenShare] = useState(false)
//   function shareScreen(){
//     startScreenShare();
//     setScreenShare(!screenShare)
//   }

// //exit video conference
//   function exit(){
//     leaveCall();
//     stopScreenShare()
//   }

// function mute_user() {
//   sendActionMessageToChannel({type: "MUTE_USER", id: `${localStorage.getItem("2")}`})
// }

// function mute_video() {
//   sendActionMessageToChannel({type: "CAMERA_OFF_USER", id: `${localStorage.getItem("2")}`})
//   sendActionMessageToChannel({type: "CAMERA_OFF_USER", id: `${localStorage.getItem("3")}`})
//   sendActionMessageToChannel({type: "CAMERA_OFF_USER", id: `${localStorage.getItem("4")}`})
//   sendActionMessageToChannel({type: "CAMERA_OFF_USER", id: `${localStorage.getItem("5")}`})
//   sendActionMessageToChannel({type: "CAMERA_OFF_USER", id: `${localStorage.getItem("6")}`})
//   sendActionMessageToChannel({type: "CAMERA_OFF_USER", id: `${localStorage.getItem("7")}`})
//   sendActionMessageToChannel({type: "CAMERA_OFF_USER", id: `${localStorage.getItem("8")}`})
//   sendActionMessageToChannel({type: "CAMERA_OFF_USER", id: `${localStorage.getItem("9")}`})
//   sendActionMessageToChannel({type: "CAMERA_OFF_USER", id: `${localStorage.getItem("10")}`})
//   sendActionMessageToChannel({type: "CAMERA_OFF_USER", id: `${localStorage.getItem("1")}`})
// }

//   return (
//     <>
//       <div className="container wrapper">
// {/*Main Video Screen*/}

//         <div className="main-container">
//           <div className="row my-4">
//               <div className="col-sm-12">
//               <div className="sizing">
//                 <div id="local_stream" className="local_stream" style={{ width: "100%", height: "90vh", display: "flex"}}></div>
//                 </div>
//               </div>
//           </div>

//           {/* <div className="row" style={{height: "38vh"}}>
//               <div className="col-sm-4"  style={{height: "fit-content"}}>
//                 <div className="sizing" style={{height: "38vh"}}>
//                   <div id="screen-share" className="screen-share" style={{ width: "100%", height: "38vh", display: "flex"}}></div>
//                 </div>
//               </div>  
//           </div> */}
//         </div>


// {/*Footer*/}
      
//         <div className="meeting-footer">
//         <div
//             className={"meeting-icons active fa-2x" + (audio === false ? "" : "active")}>
//             <FontAwesomeIcon
//               className="button-mic"
//               icon={faMicrophone}
//               onClick={muteAudio}
//             />
//           </div>
//           <div
//             className={"meeting-icons active fa-lg" + (video === false ? "" : "active")}>
//             <FontAwesomeIcon 
//             className="button-video"
//             icon={faVideo} 
//             onClick={muteVideo}
//             />
//           </div>
//           <div
//             className={"meeting-icons active off-screenShare fa-2x" + (screenShare === false ? "" : "active")} id="screenSharing">
//             <FontAwesomeIcon 
//             button="button-screen-share"
//             icon={faDesktop} 
//             onClick={shareScreen}
//             />
//           </div>
//           <div
//             className={"meeting-icons active fa-2x"}>
//           <FontAwesomeIcon 
//             button="button-signout"
//             icon={faSignOutAlt} 
//             onClick={exit}
//           />
//           </div>

//           {/* <div
//             className={"meeting-icons active"}>
//           <FontAwesomeIcon 
//             onClick={mute_user}
//             icon={faVolumeMute} 
//           />
//           </div>
//           <div
//             className={"meeting-icons active"}>
//           <FontAwesomeIcon 
//             onClick={mute_video}
//             icon={faVideoSlash} 
//           />
//           </div> */}
//         </div>

//         <div className="chat-box-apperence">
//           <Chat></Chat>
//         </div>

        
//           <div className="" style={{height: "0vh"}}>
//             <div id="remote_video_" style={{ margin:'0px' ,width: "40vh", height: "38vh", display: "flex", position: "absolute", top: "0vh", left: "0"}}>
//             </div>               
//           </div>


//         </div>

//     </>
//   )
// };

// export default Options;






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
  faComment,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { joinChannelForScreenShare, stopScreenShare, startScreenShare} from "../../services/agora/screen-share/AgoraScreenShareService";
import Chat from "../Chat/Messenger";
import { initChat, sendActionMessageToChannel } from "../../services/agora/chat/AgoraChatService";
import { useEffect, useState } from "react";
import AudioOff from '../../assests/AudioOff.png'
import Group from '../../assests/Group.png'
import spreadsheet from '../../assests/spreadsheet.png'
import Vector from '../../assests/Vector.png'

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
    if(!screenShare){
      // document.getElementsByClassName("screen-share-here").style.display = "none"
    }
  }

//exit video conference
  function exit(){
    leaveCall();
    stopScreenShare()
  }

function mute_user() {
  sendActionMessageToChannel({type: "MUTE_USER", id: `${localStorage.getItem("2")}`})
}

const [showChatBox, setShowChatBox] = useState(false)

function chatBox(){
  setShowChatBox(!showChatBox);
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
              <div className="col-sm-12">
              <div className="sizing">
                <div id="local_stream" className="local_stream" style={{ width: "100%", height: "90vh", display: "flex"}}></div>
                </div>
              </div>
          </div>

          {/* <div className="row" style={{height: "38vh"}}>
              <div className="col-sm-4"  style={{height: "fit-content"}}>
                <div className="sizing" style={{height: "38vh"}}>
                  <div id="screen-share" className="screen-share" style={{ width: "100%", height: "38vh", display: "flex"}}></div>
                </div>
              </div>  
          </div> */}
        </div>


{/*Footer*/}
      
        
        <div
            // className={"meeting-icons active fa-2x mic-button" + (audio === false ? "" : "active")}>
            className={`fa-2x mic-button ${audio ? "background-color" : ""}`}>
            <FontAwesomeIcon
              className="button-mic"
              icon={faMicrophone}
              onClick={muteAudio}
            />
          </div>
          <div
            className={`fa-lg video-button ${video ? "background-color" : ""}`}>
            <FontAwesomeIcon 
            className="button-video"
            icon={faVideo} 
            onClick={muteVideo}
            />
          </div>
          <div
            className={`fa-lg screen-share ${screenShare ? "background-screen-share" : ""}`} id="screenSharing">
            <FontAwesomeIcon 
            className="button-screen-share"
            icon={faDesktop} 
            onClick={shareScreen}
            />
          </div>
          <div
            className={"fa-lg signout-button"}>
          <FontAwesomeIcon 
            className="button-signout"
            icon={faSignOutAlt} 
            onClick={exit}
          />
          </div>
          <div
            className={`fa-lg chat-button ${showChatBox ? "active-chat-box" : ""}`}>
            <FontAwesomeIcon 
            className="button-chat"
            icon={faComment} 
            onClick={chatBox}
            />
          </div>

          <div
            className={`fa-lg addUser`}>
            <FontAwesomeIcon 
            className="button-addUser"
            icon={faUserPlus} 
            />
          </div>

          <div
            className={`fa-lg audioOff`} >
            <img className="audioOff-img" src={AudioOff} alt="hello" style={{padding: "0vh"}}></img>
          </div>
         
          <div
            className={`fa-lg group`} >
            <img className="audioOff-img" src={Group} alt="hello" style={{padding: "0vh"}}></img>
          </div>

          <div
            className={`fa-lg spreadsheet`} >
            <img className="spreadsheet-img" src={spreadsheet} alt="hello" style={{padding: "0vh"}}></img>
          </div>

          <div
            className={`fa-lg Vector`} >
            <img className="Vector-img" src={Vector} alt="hello" style={{padding: "0vh"}}></img>
          </div>
         

          {/* <div
            className={"meeting-icons active"}>
          <FontAwesomeIcon 
            onClick={mute_user}
            icon={faVolumeMute} 
          />
          </div>
          <div
            className={"meeting-icons active"}>
          <FontAwesomeIcon 
            onClick={mute_video}
            icon={faVideoSlash} 
          />
          </div> */}
        </div>

        <div className="chat-box-apperence $">
          {/* <Chat></Chat> */}
          {showChatBox ? <Chat/> : null}
        </div>

        
        <div className="" style={{height: "0vh"}}>
            <div id="remote_video_" style={{ margin:'0px' ,width: "40vh", height: "38vh", display: "flex", position: "absolute", top: "0vh", left: "0"}}>
             </div>               
        </div>

          <div className="" style={{height: "0vh"}}>
            <div id="screen-share-here" className="screen-share-here" style={{ margin:'0px' ,width: "40vh", height: "38vh", display: "flex", position: "absolute", top: "0vh", left: "40vh"}}>
            </div>               
          </div>


    </>
  )
};

export default Options;

