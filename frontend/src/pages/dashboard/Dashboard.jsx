
import LeaderBoard from "../../components/LeaderBoard.jsx";
import Container from "../../components/Container";
import Chat from "../../components/Chat.jsx";
import  "../../styles/dashboard.css";
import React,{ useEffect, useState } from "react";
import { useParams, useLocation } from "react-router";
import { socket } from "../../service/socket"


const Dashboard = () => {
    const { room } = useParams()
    const { name } = useLocation()
    const [users ,setUsers] = useState([])
    useEffect(() => {

        socket.emit('join' , { room, name } ,(err, _users) => {
            console.log('aaya');
            if (err) {
                console.log('(1) An error:', err);
                return
            }
            console.log('Dashboard users:', _users);
            setUsers(_users)
        });
        socket.on('player joined', (user) =>{
            console.log('player joined:', user);
            setUsers(users => [...users, user])
        })
    }, [window.location])
    console.log('(2)Dashboard users', users);
    return ( 
        <>
        <div className="playContainer">
        <LeaderBoard />
        <Container/>
        <Chat room={room} name={name} users={users}/>
        </div>
        </>
     );
}
 
export default Dashboard;