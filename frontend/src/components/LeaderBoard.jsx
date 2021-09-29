import  "../styles/leaderboard.css";
import { Avatar } from "@mui/material"
// import { CreateOutlined } from "@mui/icons-material";
import {useState, useEffect} from "react";
import { socket } from "../service/socket";

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
      children: name.includes(' ') ? `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`:`${name.split(' ')[0][0]}`,
    };
  }

const LeaderBoard = ({ room, name }) => {
  const [users, setUsers] = useState([]);
  let points = 0;
  useEffect(() => {
    socket.emit('join' , { room, name, points } ,(err, _users) => {
      console.log('In join');
      if (err) {
        console.log('(1) An error:', err);
        return
      }
      console.log('Leaderboard users:', _users);
      setUsers(_users)
      window.localStorage.setItem('users', window.JSON.stringify(_users))
    });
    socket.on('player joined', (user) => {
      console.log('player joined:', user);
      setUsers(users => [...users, user])
      window.localStorage.setItem('users', window.JSON.stringify([...users, user]))
    })
  }, [window.location]);

  console.log('In Leaderboard users:', users);

  return ( 
    <div className="board">
      <h2>Leader Board</h2>
      <div className="ranks">
        <ul className="ranklist">
          {
            users.map(({ name,points }, i) => {
              return (
                <li key={i} className="ranklistItem">
                  <Avatar {...stringAvatar(name)} />
                  <h4>{name}</h4>
                  <div className="points">{points}</div>
                </li>
              )
            })
          }
        </ul>
      </div>
    </div>
  );
}
 
export default LeaderBoard;