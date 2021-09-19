import  "../styles/leaderboard.css";
import { Avatar } from "@mui/material"
import { CreateOutlined } from "@mui/icons-material";

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
const LeaderBoard = () => {
    return ( 
        <div className="board">
            <h2>Leader Board</h2>
            <div className="ranks">
                <ul className="ranklist">
                    
                    <li className="ranklistItem">
                    <Avatar {...stringAvatar('Rohan Rao')} />
                    <h4>Rohan</h4>
                    <div className="points">
                         180
                    </div>
                    </li>
                    <li className="ranklistItem active">
                    <Avatar {...stringAvatar('Abha Jha')} />
                    <h4>Abha Jha</h4>
                    <div className="points">
                    <CreateOutlined/>
                         180
                    </div>
                    </li>
                    <li className="ranklistItem">
                    <Avatar {...stringAvatar('Rishav Rajkumar')} />
                    <h4>Rishav Rajkumar</h4>
                    <div className="points">
                         180
                    </div>
                    </li>
                    <li className="ranklistItem">
                    <Avatar {...stringAvatar('Ruchika Shaw')} />
                    <h4>Ruchika Shaw</h4>
                    <div className="points">
                         180
                    </div>
                    </li>
                    <li className="ranklistItem">
                    <Avatar {...stringAvatar('Md Raffiulla')} />
                    <h4>Md Raffiulla</h4>
                    <div className="points">
                         180
                    </div>
                    </li>
                    <li className="ranklistItem">
                    <Avatar {...stringAvatar('Mouli Ghosh')} />
                    <h4>Mouli Ghosh</h4>
                    <div className="points">
                         180
                    </div>
                    </li>
                              
                    
                </ul>
            </div>
        </div>
     );
}
 
export default LeaderBoard;