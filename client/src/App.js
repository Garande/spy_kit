import logo from './logo.svg';
import './App.css';
import { Button } from 'reactstrap'
import { useState, useEffect } from 'react';
import { socket } from './utils/configs';
import { SET_USERID, BROADCAST, GET_CONNECTED_USERS } from './utils/constants';
// import { GET_CONNECTED_USERS } from '../../server/utils/constants';



function App() {

  // const [socket, createSocket] = useState();

  const [message, setMessage] = useState("")

  const [userId, setUserId] = useState("")

  useEffect(() => {
    createConnection()
  }, [])

  const generateUserId = () => {
    return "USER-" + Math.random() * 100000;
  }

  const createConnection = () => {
    socket.addEventListener('open', event => {
      console.log('Connected')
      let myId = generateUserId();
      setUserId(myId);
      socket.send(JSON.stringify({ type: SET_USERID, userId: myId }))
    });

    socket.addEventListener('message', event => {
      console.log(JSON.parse(event.data));
    });

    socket.addEventListener('close', event => {
      console.log('Connection closed')
    });

    socket.addEventListener('error', event => {
      console.error(event.data)
    })
  }


  const fetchUsers = (e) => {
    socket.send(JSON.stringify({ type: GET_CONNECTED_USERS, userId: userId }));
  }


  const broadCastMesssage = (e) => [
    socket.send(JSON.stringify({ type: BROADCAST, userId: userId, data: message }))
  ]


  const handleOnChange = (e) => {
    setMessage(e.target.value)
  }


  const sendMessage = () => {
    socket.send(message)
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" style={{ maxHeight: '100px' }} />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <input name="message" onChange={(e) => handleOnChange(e)} />
        <button style={{ height: '40px', margin: '20px' }} onClick={(e) => broadCastMesssage(e)}>BroadCast</button>
        <button style={{ height: '45px' }} onClick={(e) => fetchUsers(e)}>
          Fetch Users
        </button>
      </header>
    </div>
  );
}

export default App;
