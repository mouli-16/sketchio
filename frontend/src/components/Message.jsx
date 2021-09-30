import "../styles/message.css";

const Message = ({ message, sentBy, name }) => {
  let isSentByCurrentUser = false;
  console.log("MessageObj:", message, name, sentBy);

  if (sentBy === name) {
    isSentByCurrentUser = true;
  }

  return isSentByCurrentUser ? (
    <div className="messageContainer justifyEnd">
      <div className="messageBox backgroundBlue">
        <div className="messageText user">{message}</div>
      </div>
    </div>
  ) : (
    <div className="messageContainer justifyStart">
      <p className="sentText pl-10 ">{sentBy}:</p>
      <div className="messageBox backgroundLight">
        <p className="messageText others">{message}</p>
      </div>
    </div>
  );
};
export default Message;
