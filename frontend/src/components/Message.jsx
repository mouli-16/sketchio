import ReactEmoji from 'react-emoji';

  const Message = ({ message, sentBy, name }) => {
  let isSentByCurrentUser = false;
  let other = ''
  console.log('MessageObj:', message,name, sentBy);

  if (sentBy === name) {
    isSentByCurrentUser = true
  }

  

  return (
    isSentByCurrentUser
      ? (
        <div className="messageContainer justifyEnd">
          <p className="sentText pr-10">{sentBy}</p>
           <div className="messageBox backgroundBlue">
            <p className="messageText colorWhite">{message}</p>
          </div>
        </div> 
        )
        : (
          <div className="messageContainer justifyStart">
            <p className="sentText pl-10 ">{sentBy}</p>
            <div className="messageBox backgroundLight">
              <p className="messageText colorDark">{message}</p>
             </div>
         </div>
        )
  );
}
export default Message;