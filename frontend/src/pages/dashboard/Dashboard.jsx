import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router";
import Backdrop from '@mui/material/Backdrop';

import Chat from "../../components/Chat";
import Container from "../../components/Container";
import LeaderBoard from "../../components/LeaderBoard";
import { socket } from "../../service/socket";
import "../../styles/dashboard.css";

const Dashboard = () => {
  const { room } = useParams();
  const { name } = useLocation();

  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.emit("join", { room, name, points: 0 }, (err, _users) => {
      console.log("In join");
      if (err) {
        console.log("(1) An error:", err);
        return;
      }
      console.log("Dashboard users:", _users);
      setUsers(_users.sort((a, b) => a.name.localeCompare(b.name)));
    });
    socket.on("player joined", (user) => {
      console.log("player joined:", user);
      setUsers((_users) =>
        [..._users, user].sort((a, b) => a.name.localeCompare(b.name))
      );
    });
  }, [room, name]);

  return (
    <>
        <div className="playContainer">
      {users.length === 3 ? (
        <div className="content">
          <LeaderBoard users={users} />
          <Container />
          <Chat name={name} users={users} />
          </div>
          ) : (
            <div className="backdrop">
                  <h2>This game requires 3 players. </h2>
                    <p className="backdrop-content"> Waiting for <b>{3 - users.length}</b>  more to join</p>
                  <p className="backdrop-content italic">Share this link and enjoy</p>
            </div>
            )}
        </div>
    </>
  );
};

export default Dashboard;
