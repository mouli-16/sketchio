import ReactEmoji from 'react-emoji';
import "../styles/message.css"


  function stringToColor(string) {
    let hash = 0;
    let i;
  
    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.substr(-2);
    }
    /* eslint-enable no-bitwise */
  
    return color;
  }


  const Message = ({ message, sentBy, name }) => {
  let isSentByCurrentUser = false;
  console.log('MessageObj:', message,name, sentBy);

  if (sentBy === name) {
    isSentByCurrentUser = true
  }

  return (
    isSentByCurrentUser
      ? (
        <div className="messageContainer justifyEnd">
          {/* <p className="sentText pr-10">{sentBy}:</p> */}
           <div className="messageBox backgroundBlue">
           <div className="messageText user">{message}</div>
          </div>
        </div> 
        )
        : (
          <div className="messageContainer justifyStart">
            <p className="sentText pl-10 ">{sentBy}:</p>
            <div className="messageBox backgroundLight">
              <p className="messageText others">{message}</p>
             </div>
         </div>
        )
  );
}
export default Message;