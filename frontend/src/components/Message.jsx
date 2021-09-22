import ReactEmoji from 'react-emoji';

const Message = ({ message, name ,users }) => {
  let isSentByCurrentUser = true;

  const trimmedName = name.trim().toLowerCase();

  // {users.map((user) => 
  //   if(user === trimmedName) {
  //     isSentByCurrentUser = true;
  //   }
  //   )}

  

  return (
    isSentByCurrentUser
      ? (
        <div className="messageContainer justifyEnd">
          {/* <p className="sentText pr-10">{trimmedName}</p> */}
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
            {/* <p className="sentText pl-10 ">{user}</p> */}
         </div>
        )
  );
}
export default Message;