import logo from './logo.svg';
import './App.css';
import { Button } from 'reactstrap'
import { useState, useEffect } from 'react';
import { socket } from './utils/configs';
import { SET_USERID, BROADCAST, GET_CONNECTED_USERS, SUBSCRIBE_TO_USERS, UN_SUBSCRIBE_TO_USERS } from './utils/constants';
// import { SUBSCRIBE_TO_USERS } from '../../server/utils/constants';
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
      socket.send(JSON.stringify({ type: SET_USERID, payload: myId }))
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
    socket.send(JSON.stringify({ type: BROADCAST, userId: userId, payload: message }))
  ]


  const handleOnChange = (e) => {
    setMessage(e.target.value)
  }


  const sendMessage = () => {
    socket.send(message)
  }

  const subscribeToUsers = () => {
    socket.send(JSON.stringify({ type: SUBSCRIBE_TO_USERS, userId: userId, data: "" }))
  }

  const unSubscribeToUsers = () => {
    socket.send(JSON.stringify({ type: UN_SUBSCRIBE_TO_USERS, userId: userId, payload: "" }))
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
        <button style={{ height: '40px', margin: '20px' }} onClick={(e) => subscribeToUsers(e)}>Subscribe</button>
        <button style={{ height: '40px', margin: '20px' }} onClick={(e) => socket.send(JSON.stringify({ type: "START_VPN", userId: userId, payload: message }))}>Start VPN</button>
        <button style={{ height: '40px', margin: '20px' }} onClick={(e) => socket.send(JSON.stringify({ type: "STOP_VPN", userId: userId, payload: message }))}>Stop VPN</button>
        <button style={{ height: '40px', margin: '20px' }} onClick={(e) => socket.send(JSON.stringify({ type: "GET_DEVICE_INFO", userId: userId, payload: message }))}>Device Info</button>
        <button style={{ height: '45px' }} onClick={(e) => fetchUsers(e)}>
          Fetch Users
        </button>
      </header>
    </div>
  );
}

export default App;
