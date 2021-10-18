import socket from './service/sockets'
import { useEffect } from 'react';


const App = () => {
  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected !!');
    })

    socket.on('disconnect', () => {
      console.log('Disconnected :(');
    })
  }, [])
  return (
    <h1>Sketchio</h1>
  );
}

export default App;
