import "../styles/playerinput.css"

const PlayerInput = () => {
    return ( 
        <div className="container">
            {/* <img className="bg" src="/assets/bg.jpg" alt="" /> */}
         <div className="inputWrapper">
            <div className="inputRight">
            <img className="landing" src="/assets/landing.gif" alt="" />
            </div>
            <div className="inputLeft">
                <div className="top">
                <input placeholder="Enter a Nickname" className="nickname" />
                <input placeholder="Enter Your Room Code" className="roomcode" />
                <button className="btn join">Join Room</button>
                </div>
                <hr />
                <div className="bottom">
                <input placeholder="Enter a Nickname" className="nickname2" />
                <button className="btn">Create Room</button>
                </div>
            </div>
         </div>
        </div>
     );
}
 
export default PlayerInput;