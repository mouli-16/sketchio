import ReactEmoji from 'react-emoji';

const Message = ({ message, name ,users }) => {
  let isSentByCurrentUser = false;
  let other = ''
  // console.log(message,name);
  const trimmedName = name.trim();
  
  const sh = () => {
    users.forEach((user, i) => {
      
      other = user.name
      if(user.name === trimmedName) {
        isSentByCurrentUser = true;
      }
    })
  }
  sh();

  

  return (
    isSentByCurrentUser
      ? (
        <div className="messageContainer justifyEnd">
          <p className="sentText pr-10">{name}</p>
           <div className="messageBox backgroundBlue">
            <p className="messageText colorWhite">{message}</p>
          </div>
        </div> 
        )
        : (
          <div className="messageContainer justifyStart">
            <div className="messageBox backgroundLight">
              <p className="messageText colorDark">{message}</p>
             </div>
            <p className="sentText pl-10 ">{other}</p>
         </div>
        )
  );
}
export default Message;