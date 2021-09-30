import "../styles/playerinput.css"
import Alert from '@mui/material/Alert';
import { useState } from "react";
import {Link} from "react-router-dom";
import { socket } from "../service/socket";

const PlayerInput = () => {
    const[name ,setName] = useState('');
    const[room ,setRoom] = useState('');
    const[error ,setError] = useState('');
    const[checked ,setChecked] = useState(false);
    const[created,setCreated] = useState(false);



    const createRoom = () => {
        socket.emit('create room', name, (err, _room) => {
            if (err) {
                console.log('Cannot create room:', err);
                setError(err)
                setRoom('')
                return
            }
                setRoom(_room)
                setCreated(true)
        })
    }

    const checkRoom = () => {
        socket.emit('check room', {room,name}, (err, _room) => {
            if (err) {
                console.log('Cannot check room:', err);
                setError(err)
                setRoom('')
                return
            }
            if (!_room) {
                console.log('No such room:', _room);
                setRoom('')
                return
            }
                setRoom(_room)
                setChecked(true)
        })
    }

    return (
        
        <div className="landingContainer">
            {/* <img className="bg" src="/assets/bg.jpg" alt="" /> */} 
            <div className="alert">

            {error ? (<Alert severity="error">An Error Occured: {error}</Alert>) : (checked ? (<Alert severity="success">You Entered a Valid Room Code!!!</Alert>) : (created ? (<Alert severity="success">Room Created !!!</Alert>) : null))}
            </div>
         <div className="inputWrapper">
            <div className="inputRight">
            <img className="landing" src="/assets/landing.gif" alt="" />
            </div>
            <div className="inputLeft">
                <div className="top">
                <input placeholder="Enter a Nickname" className="nickname" onChange={(e) => setName(e.target.value)}/>
                <input placeholder="Enter Your Room Code" className="roomcode" onChange={(e) => setRoom(e.target.value)} onKeyPress={event => event.key === 'Enter' ? checkRoom() : null}/>
                <div className="butn">
                {checked? (<div className="homePagebtn" ><Link style={{"textDecoration":"none", "color": "white"}}onClick={e => (!name || !room)? e.preventDefault() : null} to={{pathname: `/${room}`, name}}>
                Join Room
                </Link></div>) :  null}
                
                </div>
                </div>
                <hr />
                <div className="bottom">
                <input placeholder="Enter a Nickname" className="nickname" onChange={(e) => setName(e.target.value)} onKeyPress={event => event.key === 'Enter' ? createRoom() : null}/>
                <div className="butn">
                {created ? (<div className="homePagebtn" ><Link style={{"textDecoration":"none", "color": "white"}}onClick={e => (!name || !room)? e.preventDefault() : null} to={{pathname: `/${room}`, name}}>
                Join Room
                </Link></div>) :  null}
                </div>
                </div>
            </div>
         </div>
        </div>
     );
}
 
export default PlayerInput;