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
  const [turn ,setTurn] = useState('');
  const [word ,setWord] = useState('');
  const [message ,setMessage] = useState('');
  const [messages ,setMessages] = useState([]);
 
  const { name } = props;
  let { users } = props;
  if(users.length === 1) {
    setTurn(users[0].name)
  }
  useEffect(() => {
    socket.on('message' , (messageObj) => {
      if(messageObj.chosen){
        setTurn(messageObj.sentBy)
      }
      setMessages(messageObjs => [ ...messageObjs, messageObj ]);
      console.log('messageObj:', messageObj);
    });
  }, [window.location]);
  const sendMessage = (event) => {
    event.preventDefault();

    if(message) {
      console.log('turn:', turn, '\nusers:', users);
      if (name === turn && message.startsWith('!')){
        socket.emit('word chosen', message.slice(1), (err, word) => {
          if (err) {
            console.log('(3) An error:', err);
            return
          }
          setWord(word)
          setMessages(messageObjs => [ ...messageObjs, {message: `You have chosen: ${word}`, sentBy:name} ]);
          setMessage('')
        })
        return
      }
      if(name === turn && message === word) {
        setMessage('')
        return
      }
      socket.emit('message', {message, turn}, (err, data) => {
        if (err) {
          console.log('(2) An error:', err);
          return
        }
        const {correctGuess, msg} = data
        if (correctGuess) {
          setNextTurn()
        }
        console.log('sent message:', msg);
        setMessages(messageObjs => [ ...messageObjs, {message: msg, sentBy:name} ]);
        setMessage('')
      });
    }
  }
  const setNextTurn = () => {
    users.sort((a, b) => a.name.localeCompare(b.name))
    const index = users.findIndex((user) => user.name === turn)
    setTurn(index + 1 === users.length ? users[0] : users[index + 1])
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