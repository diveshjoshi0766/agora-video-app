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
    sendFileMessageToChannel(`${msg}`, e.target.files)
    console.log(msg + " " + e.target.files)
  }

  const upload = (e) => {
    console.warn(e.target.files);
  }

  var chatMessageCount = 0;
  return (
    <div className="messenger-container" style={{borderRadius: "4vh"}}>

      <div className="messenger-header-tabs">
        <div className="tab">
          <FontAwesomeIcon className="icon" icon={faCommentAlt} />
          <p>Chat</p>
        </div>
      </div>

      <div className="chat-section">
          <div key={chatMessageCount++} className="chat-block">
            <div className="sender">
            </div>
            <p className="msg">{}</p>
          </div> 
      </div>

      <div className="send-msg-section">
        <input
          placeholder="Send a message to everyone"
          value={msg}
          onChange={(e) => handleChangeMsg(e)}
          onKeyDown={(e) => handleKeyDown(e)}
        />
        <FontAwesomeIcon
          className="icon"
          icon={faPaperPlane}
          onClick={handleSendMsg}
        />
        {/* <i class="fas fa-file-code icon"><input type="file" onChange={(e) => upload(e)} name="img"></input></i> */}
        <input type="file" onChange={(e) => upload(e)} onClick={(e) => handleFileSubmit(e)}></input>
      </div>
    </div>
  );
};

export default Messenger;