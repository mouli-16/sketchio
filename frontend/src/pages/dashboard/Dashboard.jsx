
import LeaderBoard from "../../components/LeaderBoard.jsx";
import Draw from "../../components/Draw.jsx";
import Chat from "../../components/Chat.jsx";
import  "../../styles/dashboard.css";
import React,{ useEffect } from "react";


const Dashboard = () => {
    
    return ( 
        <>
        <div className="playContainer">
        <LeaderBoard />
        <Draw/>
        <Chat/>
        </div>
        </>
     );
}
 
export default Dashboard;