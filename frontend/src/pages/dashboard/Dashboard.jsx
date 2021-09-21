
import LeaderBoard from "../../components/LeaderBoard.jsx";
import Draw from "../../components/Draw.jsx";
import Chat from "../../components/Chat.jsx";
import  "../../styles/dashboard.css";



const Playarea = () => {
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
 
export default Playarea;