import "../styles/playerinput.css"
import Alert from '@mui/material/Alert';
import { useState } from "react";
import {Link} from "react-router-dom";
import { socket } from "../service/socket";

const PlayerInput = () => {
    const[name ,setName] = useState('');
    const[room ,setRoom] = useState('');
    const[tempRoom ,setTempRoom] = useState('');
    let _error = false;


    const createRoom = () => {
        socket.emit('create room', name, (err, _room) => {
            if (err) {
                console.log('Cannot create room:', err);
                setRoom('')
                _error = true;
                return
            }
                setRoom(_room)
        })
    }

    const checkRoom = () => {
        socket.emit('check room', tempRoom, (err, _room) => {
            if (err) {
                console.log('Cannot check room:', err);
                _error = true;
                setRoom('')
                return
            }
            if (!_room) {
                console.log('No such room:', _room);
                setRoom('')
                return
            }
                setRoom(_room)
        })
    }

    return (
        
        <div className="landingContainer">
            {/* <img className="bg" src="/assets/bg.jpg" alt="" /> */} 
            <div className="alert">

            {_error ? (<Alert severity="error">An Error Occured</Alert>) : (room ? (<Alert severity="success">Room Created Successfully!!!</Alert>) : (<Alert severity="warning">Room Not Found!!!</Alert>))}
            </div>
         <div className="inputWrapper">
            <div className="inputRight">
            <img className="landing" src="/assets/landing.gif" alt="" />
            </div>
            <div className="inputLeft">
                <div className="top">
                <input placeholder="Enter a Nickname" className="nickname" onChange={(e) => setName(e.target.value)}/>
                <input placeholder="Enter Your Room Code" className="roomcode" onChange={(e) => setTempRoom(e.target.value)} />
                <div className="butn">
                <Link onClick={e => (!name || !room)? e.preventDefault() : null} to={{pathname: `/${room}`, name}}>
                <button className="homePagebtn join" onClick={()=>{checkRoom()}}>Join Room</button>
                </Link>
                </div>
                </div>
                <hr />
                <div className="bottom">
                <input placeholder="Enter a Nickname" className="nickname" onChange={(e) => setName(e.target.value)}/>
                <div className="butn">
                <Link onClick={e => (!name || !room)? e.preventDefault() : null} to={{pathname: `/${room}`, name}}>
                <button className="homePagebtn" onClick={()=>{createRoom()}}>Create Room</button>
                </Link>
                </div>
                </div>
            </div>
         </div>
        </div>
     );
}
 
export default PlayerInput;