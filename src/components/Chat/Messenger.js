import { useState } from "react";
import "./Messenger.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faFileSearch,
  faCommentAlt,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { sendMessageToChannel, sendFileMessageToChannel, sendChannelMessage } from "../../services/agora/chat/AgoraChatService";

var messageFromUser = sendChannelMessage();
console.log(messageFromUser)

const Messenger = () => {
  const [msg, setMsg] = useState("");
  const handleChangeMsg = (e) => {
    setMsg(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessageToChannel(msg)
      setMsg("");
    }
  };

  const handleSendMsg = () => {
    sendMessageToChannel(`${msg}`);
    console.log(msg)
    setMsg("");
  };

  const handleFileSubmit = (e) => {
    console.log(msg + " " + e.target.files)
    sendFileMessageToChannel(`${msg}`, e.target.files)
  }

  const upload = (e) => {
    console.warn(e.target.files);
  }

  var chatMessageCount = 0;
  return (
    <div className="messenger-container" style={{height: "100vh", width: "48.3vh"}}>

      <div className="messenger-header-tabs" style={{backgroundColor: "rgb(238 240 244)", backgroundImage: "linear-gradient(486deg, #ffffff 4%, #dcdee0 74%)"}}>
        <div className="tab" style={{backgroundColor: "rgb(238 240 244)",fontWeight: "700", margin: "2vh", backgroundImage: "linear-gradient(486deg, #ffffff 4%, #dcdee0 74%)"}}>
          <p>Chat</p>
        </div>
      </div>

      <div className="chat-section" style={{backgroundColor: "rgb(238 240 244)", backgroundImage: "linear-gradient(486deg, #ffffff 4%, #dcdee0 74%)"}}>
          <div key={chatMessageCount++} className="chat-block">
            <div className="sender">
            </div>
            <p className="msg">{}</p>
          </div> 
      </div>

      <div className="send-msg-section" style={{backgroundColor: "rgb(238 240 244)", backgroundImage: "linear-gradient(486deg, #ffffff 4%, #dcdee0 74%)"}}>
        <input
          placeholder="Send a message to everyone"
          value={msg}
          onChange={(e) => handleChangeMsg(e)}
          onKeyDown={(e) => handleKeyDown(e)}
          style={{backgroundColor: "rgb(238 240 244)", backgroundImage: "linear-gradient(486deg, #ffffff 4%, #dcdee0 74%)"}}
        />
        <FontAwesomeIcon
          className="icon"
          icon={faPaperPlane}
          onClick={handleSendMsg}
        />
        {/* <i class="fas fa-file-code icon"><input type="file" onChange={(e) => upload(e)} name="img"></input></i> */}
        {/* <input type="file" onChange={(e) => upload(e)} onClick={(e) => handleFileSubmit(e)}></input> */}
      </div>
    </div>
  );
};

export default Messenger;