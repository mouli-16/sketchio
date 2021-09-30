import  "../../styles/dashboard.css";
import LeaderBoard from "../../components/LeaderBoard.jsx";
import Container from "../../components/Container";
import Chat from "../../components/Chat.jsx";
import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router";
import { socket } from "../../service/socket";


const Dashboard = () => {
    const { room } = useParams()
    const { name } = useLocation()

    const [users, setUsers] = useState([])

    useEffect(() => {
        socket.emit('join' , { room, name, points:0 } ,(err, _users) => {
          console.log('In join');
          if (err) {
            console.log('(1) An error:', err);
            return
          }
          console.log('Dashboard users:', _users);
          setUsers(_users.sort((a, b) => a.name.localeCompare(b.name)))
        });
        socket.on('player joined', (user) => {
          console.log('player joined:', user);
          setUsers(_users => [..._users, user].sort((a, b) => a.name.localeCompare(b.name)))
        })
    }, [window.location]);

    return ( 
        <>
            { users.length === 3 ? (
                <div className="playContainer">
                    <LeaderBoard users={users}/>
                    <Container/>
                    <Chat name={name} users={users}/>
                </div>
            ):(
                <div className="backdrop">
                    <h3>This game requires 3 players, more {3-users.length}</h3>
                    <p className="backdrop-content">
                        Share this link and enjoy
                    </p>
                </div>
            )
            }
        </>
     );
}
 
export default Dashboard;