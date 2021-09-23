import  "../styles/chat.css";
import { Send } from "@mui/icons-material";
// import { Avatar } from "@mui/material";
import {useState,useEffect} from "react";
import queryString from 'query-string';
import io from "socket.io-client";
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
const ENDPOINT = 'localhost:8000';
let socket;

const Chat = () => {
  const [name ,setName] = useState('');
  const [room ,setRoom] = useState('');
  const [message ,setMessage] = useState('');
  const [messages ,setMessages] = useState([]);
  const [users ,setUsers] = useState([]);
 
  
  useEffect(() => {
    const { name, room } = queryString.parse(window.location.search);
    
    socket = io(ENDPOINT);
    
    setName(name);
    setRoom(room);
    
    
    socket.emit('join' , { room, name } ,(err, users) => {
      if (err) {
        console.log('(1) An error:', err);
        return
      }
      setUsers(users);   
    });
  }, [name]);  
  useEffect(() => {
    socket.on('message' , (message) => {
      setMessages(messages => [ ...messages, message ]);
      console.log('message:', messages);
    });
    socket.on('player joined', (user) =>{
      console.log('player joined:', user);
    })
  }, [name]);
  const sendMessage = (event) => {
    event.preventDefault();

    if(message) {
      socket.emit('message', message, (err, msg) => {
        if (err) {
          console.log('(2) An error:', err);
          return
        }
        console.log('sent message:', msg);
        setMessage('')
      });
    }
  }
    return (  
        <div className="chat">
            <div className="txt">
            {messages.map((message, i) => <div key={i}><Message message={message} name={name} users={users}/></div>)}
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