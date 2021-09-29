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
  const [users ,setUsers] = useState([]);
 
  const { name } = props;

  useEffect(() => {
    console.log('fetching users:', users);
    setUsers(window.JSON.parse(window.localStorage.getItem('users')))
    console.log('chat users:', users);
    if(users.length === 1) {
      setTurn(users[0].name)
      console.log('setting turn:', turn);
    }
  }, [window.localStorage.getItem('users')])
  useEffect(() => {
    socket.on('message' , (messageObj) => {
      if(messageObj.chosen){
        setTurn(messageObj.sentBy)
      }
      setMessages(messageObjs => [ ...messageObjs, messageObj ]);
      console.log('messageObj:', messageObj);
    });
  }, [window.location]);
  const setNextTurn = () => {
    console.log('in setnectturn');
    users.sort((a, b) => a.name.localeCompare(b.name))
    const index = users.findIndex((user) => user.name === turn)
    setTurn(index + 1 === users.length ? users[0] : users[index + 1])
    console.log('called setNextTurn', turn);
  }
  const sendMessage = (event) => {
    event.preventDefault();
    console.log('turn turn:',turn);
    if(message) {
      console.log('turn:', turn, '\nusers:', users);
      if (name === turn && message.startsWith('!')){
        console.log('turn turn turn', turn);
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
        console.log('turn turn turn turn turn', turn);
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