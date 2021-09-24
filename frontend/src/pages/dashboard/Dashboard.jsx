
import LeaderBoard from "../../components/LeaderBoard.jsx";
import Container from "../../components/Container.jsx";
import Chat from "../../components/Chat.jsx";
import  "../../styles/dashboard.css";
import React,{ useEffect } from "react";


const Dashboard = () => {
    
    return ( 
        <>
        <div className="playContainer">
        <LeaderBoard />
        <Container/>
        <Chat/>
        </div>
        </>
     );
}
 
export default Dashboard;