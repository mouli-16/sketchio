import { Avatar } from "@mui/material";

import stringAvatar from "../service/avatar";
import "../styles/leaderboard.css";

const LeaderBoard = ({ users }) => {
  console.log("In Leaderboard users:", users);

  return (
    <div className="board">
      <h2>Leader Board</h2>
      <div className="ranks">
        <ul className="ranklist">
          {users.map(({ name, points }, i) => {
            return (
              <li key={i} className="ranklistItem">
                <Avatar {...stringAvatar(name)} />
                <h4>{name}</h4>
                <div className="points">{points}</div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default LeaderBoard;
