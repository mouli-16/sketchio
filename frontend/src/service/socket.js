import io from "socket.io-client";

const ENDPOINT = process.env.REACT_APP_SOCKET_ENDPOINT || 'localhost:8000'

export const socket = io(ENDPOINT)
