import  "../styles/leaderboard.css";
import { Avatar } from "@mui/material"
import Player from "./Player";
// import { CreateOutlined } from "@mui/icons-material";

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
const LeaderBoard = (users) => {
    return ( 
        <div className="board">
            <h2>Leader Board</h2>
            <div className="ranks">
            {/* {users.map(({user}, i) => <div key={i}><Player user={user} /> </div>)} */}
                
            </div>
        </div>
     );
}
 
export default LeaderBoard;