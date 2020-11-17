import logo from './logo.svg';
import './App.css';
import { Button } from 'reactstrap'
import { useState, useEffect } from 'react';
import { socket } from './utils/configs';



function App() {

  // const [socket, createSocket] = useState();

  const [message, setMessage] = useState("")

  useEffect(() => {
    createConnection()
  }, [])

  const createConnection = () => {
    socket.addEventListener('open', event => {
      console.log('Connected')
    });

    socket.addEventListener('message', event => {
      console.log(event.data);
    });

    socket.addEventListener('close', event => {
      console.log('Connection closed')
    });

    socket.addEventListener('error', event => {
      console.error(event.data)
    })
  }


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
        <button style={{ height: '40px', margin: '20px' }} onClick={(e) => sendMessage()}>Send</button>
        <button style={{ height: '45px' }} onClick={() => createConnection()}>
          Connect
        </button>
      </header>
    </div>
  );
}

export default App;
