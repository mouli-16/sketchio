import  "../../styles/dashboard.css";
import LeaderBoard from "../../components/LeaderBoard.jsx";
import Container from "../../components/Container";
import Chat from "../../components/Chat.jsx";
import React, { useState } from "react";
import { useParams, useLocation } from "react-router";


const Dashboard = () => {
    const { room } = useParams()
    const { name } = useLocation()

    const [users, setUsers] = useState([])

    const updateUsers = (users) => {
        console.log('updating users:', users);
        setUsers(users)
    }

    return ( 
        <>
        <div className="playContainer">
        <LeaderBoard name={name} room={room} updateUsers={(_users) => {updateUsers(_users)}}/>
        <Container/>
        <Chat name={name} users={users}/>
        </div>
        </>
     );
}
 
export default Dashboard;