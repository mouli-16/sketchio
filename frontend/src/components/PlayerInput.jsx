import "../styles/playerinput.css"
import { useState } from "react";
import {Link} from "react-router-dom";

const PlayerInput = () => {
    const[name ,setName] = useState('');
    const[room ,setRoom] = useState('');


    return ( 
        <div className="container">
            {/* <img className="bg" src="/assets/bg.jpg" alt="" /> */}
         <div className="inputWrapper">
            <div className="inputRight">
            <img className="landing" src="/assets/landing.gif" alt="" />
            </div>
            <div className="inputLeft">
                <div className="top">
                <input placeholder="Enter a nickname" className="nickname" onChange={(e) => setName(e.target.value)}/>
                <input placeholder="Enter Your Room Code" className="roomcode" onChange={(e) => setRoom(e.target.value)} />
                <Link onClick={e => (!name || !room)? e.preventDefault() : null} to={{pathname: `/${room}`, name}}>
                <button className="homePagebtn join">Join Room</button>
                </Link>
                </div>
                <hr />
                <div className="bottom">
                <input placeholder="Enter a Nickname" className="nickname2" />
                <button className="homePagebtn">Create Room</button>
                </div>
            </div>
         </div>
        </div>
     );
}
 
export default PlayerInput;