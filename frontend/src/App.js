import { useEffect, useState } from "react";

import socket from "./service/sockets";

const App = () => {
  const [name, setName] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to the server!!");
    });

    socket.on("user-name", ({ name, sid }) => {
      setUsers((_users) => [..._users, { name, sid }]);
    });

    socket.on("disconnect", () => {
      console.log("Server got disconnected :(");
    });
  }, []);

  const sendName = () => {
    socket.emit("user-name", name);
  };

  return (
    <>
      <h1>Sketchio</h1>
      {name ? <p>👋{name}</p> : null}
      Name:{" "}
      <input
        placeholder="Enter a Nickname"
        className="nickname"
        onChange={(event) => setName(event.target.value)}
        onKeyPress={(event) => (event.key === "Enter" ? sendName() : null)}
      /> 
      {users.map((user, i) => {
        return (
          <p key={i}>
            {i + 1} Name: {user.name} Socket ID: {user.sid}
          </p>
        );
      })}
    </>
  );
};

export default App;
