import  "../styles/chat.css";
import { Send } from "@mui/icons-material";
// import { Avatar } from "@mui/material";
import {useState,useEffect} from "react";
import { socket } from "../service/socket";
import Message from "./Message";



// function stringToColor(string) {
//     let hash = 0;
//     let i;
  
//     /* eslint-disable no-bitwise */
//     for (i = 0; i < string.length; i += 1) {
//       hash = string.charCodeAt(i) + ((hash << 5) - hash);
//     }
  
//     let color = '#';
  
//     for (i = 0; i < 3; i += 1) {
//       const value = (hash >> (i * 8)) & 0xff;
//       color += `00${value.toString(16)}`.substr(-2);
//     }
//     /* eslint-enable no-bitwise */
  
//     return color;
//   }
// function stringAvatar(name) {
//     return {
//       sx: {
//         bgcolor: stringToColor(name),
//       },
//       children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
//     };
//   }

const Chat = (props) => {
  const [message ,setMessage] = useState('');
  const [messages ,setMessages] = useState([]);
 
  const { name } = props;
  
  useEffect(() => {
    socket.on('message' , (messageObj) => {
      setMessages(messageObjs => [ ...messageObjs, messageObj ]);
      console.log('messageObj:', messageObj);
    });
  }, [window.location]);
  const sendMessage = (event) => {
    event.preventDefault();

    if(message) {
      socket.emit('message', message, (err, msg) => {
        if (err) {
          console.log('(2) An error:', err);
          return
        }
        console.log('sent message:', msg);
        setMessages(messageObjs => [ ...messageObjs, {message, sentBy:name} ]);
        setMessage('')
      });
    }
  }
    return (  
        <div className="chat">
            <div className="txt">
            {messages.map(({message, sentBy}, i) => <div key={i}><Message message={message} sentBy={sentBy} name={name}/></div>)}
            </div>
            <div className="type">
            <input placeholder="Type Your Text" className="textArea" value={message} 
            onChange={({ target: { value } }) => setMessage(value)}
            onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}/>
            <button className="btn">
                <Send/>
            </button>
            </div>
        </div>
    );
}
 
export default Chat;