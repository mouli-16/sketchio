import  "../styles/chat.css";
import { Send } from "@mui/icons-material"
import { Avatar } from "@mui/material"



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
function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }
const Chat = () => {
    return (  
        <div className="chat">
            <div className="txt">
            <ul className="ranklist">
                    
                    <li className="ranklistItem">
                    <Avatar {...stringAvatar('Rohan Rao')} />
                    <h6>ty fijn fuiheoip ji</h6>
                    </li>
                    <li className="ranklistItem active">
                    <Avatar {...stringAvatar('Abha Jha')} />
                    <h6>ty fijn ihgihk fuiheoip</h6>
                    </li>
                    <li className="ranklistItem">
                    <Avatar {...stringAvatar('Rishav Rajkumar')} />
                    <h6>ty fijkn hu fuiheoip</h6>
                    </li>
                    <li className="ranklistItem">
                    <Avatar {...stringAvatar('Ruchika Shaw')} />
                    <h6>tyjh fijn fuiheoip</h6>
                    </li>
                    <li className="ranklistItem">
                    <Avatar {...stringAvatar('Md Raffiulla')} />
                    <h6>ty fijn fuiheoip jihj</h6>
                    </li>
                    <li className="ranklistItem">
                    <Avatar {...stringAvatar('Mouli Ghosh')} />
                    <h6>Mouli is typing...</h6>
                    </li>
                              
                    
                </ul>
            </div>
            <div className="type">
            <input placeholder="Type Your Text" className="textArea" />
            <button className="btn">
                <Send/>
            </button>
            </div>
        </div>
    );
}
 
export default Chat;