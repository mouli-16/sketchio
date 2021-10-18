import io from "socket.io-client";

const ENDPOINT = process.env.REACT_APP_SOCKET_ENDPOINT || "localhost:8000";
const socket = io(ENDPOINT);

export default socket;