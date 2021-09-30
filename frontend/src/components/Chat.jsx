import { useState, useEffect } from "react";
import { Send } from "@mui/icons-material";

import Message from "./Message";
import { socket } from "../service/socket";
import "../styles/chat.css";

const Chat = ({ name, users }) => {
  const [turn, setTurn] = useState(users[0].name);
  const [word, setWord] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("message", (messageObj) => {
      if (messageObj.chosen) {
        setTurn(messageObj.sentBy);
      }
      setMessages((messageObjs) => [...messageObjs, messageObj]);
      console.log("messageObj:", messageObj);
    });
  }, []);

  const setNextTurn = () => {
    const index = users.findIndex((user) => user.name === turn);
    setTurn(users[(index + 1) % 3].name);
  };

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      if (name === turn && message.startsWith("!")) {
        socket.emit("word chosen", message.slice(1), (err, word) => {
          if (err) {
            console.log("(3) An error:", err);
            return;
          }
          setWord(word);
          setMessages((messageObjs) => [
            ...messageObjs,
            { message: `You have chosen: ${word}`, sentBy: name },
          ]);
          setMessage("");
        });
        return;
      }
      if (name === turn && message === word) {
        setMessage("");
        return;
      }
      socket.emit("message", { message, turn }, (err, data) => {
        if (err) {
          console.log("(2) An error:", err);
          return;
        }
        const { isCorrectGuess, msg } = data;
        if (isCorrectGuess) {
          setNextTurn();
        }
        console.log("sent message:", msg);
        setMessages((messageObjs) => [
          ...messageObjs,
          { message: msg, sentBy: name },
        ]);
        setMessage("");
      });
    }
  };
  return (
    <div className="chat">
      <div className="txt">
        {messages.map(({ message, sentBy }, i) => (
          <div key={i}>
            <Message message={message} sentBy={sentBy} name={name} />
          </div>
        ))}
      </div>
      <div className="type">
        <input
          placeholder="Type Your Text"
          className="textArea"
          value={message}
          onChange={({ target: { value } }) => setMessage(value)}
          onKeyPress={(event) =>
            event.key === "Enter" ? sendMessage(event) : null
          }
        />
        <button className="btn">
          <Send />
        </button>
      </div>
    </div>
  );
};

export default Chat;
