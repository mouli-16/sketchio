import  "../../styles/dashboard.css";
import LeaderBoard from "../../components/LeaderBoard.jsx";
import Container from "../../components/Container";
import Chat from "../../components/Chat.jsx";
import React, { useState } from "react";
import { useParams, useLocation } from "react-router";


const Dashboard = () => {
    const { room } = useParams()
    const { name } = useLocation()

    window.localStorage.clear()

    return ( 
        <>
        <div className="playContainer">
        <LeaderBoard name={name} room={room} />
        <Container/>
        <Chat name={name} />
        </div>
        </>
     );
}
 
export default Dashboard;