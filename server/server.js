const express = require('express')

const app = express();

const bodyParser = require('body-parser');

const cors = require('cors');
const http = require('http')

app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())


const WebSocket = require('ws');
const { SET_USERID, SEND_MESSAGE, BROADCAST, GET_CONNECTED_USERS } = require('./utils/constants');
const { client } = require('websocket');
// const { connection } = require('mongoose');
// const server = http.createServer(app);

const ws = new WebSocket.Server({ port: 5001 });


const sendMessage = (message) => {
    ws.clients.forEach(client => {
        if (client.id == message.receiverId) {
            client.send(JSON.stringify(message.data));
        }
    })
}

const broadCastMessage = (wsConnection, message) => {
    ws.clients.forEach(client => {
        if (wsConnection != client) {
            client.send(JSON.stringify(message.data));
        }
    })
}

const getConnectedUsers = (wsConnection, message) => {
    let users = [];
    ws.clients.forEach(client => {
        let user = { userId: client.id };
        users.push(user);
    });

    wsConnection.send(JSON.stringify({ users, type: message.type }))
}


ws.on('connection', function connection(wsConnection) {


    wsConnection.on('message', message => {


        let data = JSON.parse(message)

        console.log(`Server received: ${data.type}`);

        if (data.type === SET_USERID) {
            wsConnection.id = data.userId;
        } else if (data.type === SEND_MESSAGE) {
            sendMessage(data)
        } else if (data.type === BROADCAST) {
            broadCastMessage(wsConnection, data)
        } else if (data.type === GET_CONNECTED_USERS) {
            getConnectedUsers(wsConnection, data)
        }

        // if (message.type == SET_USERID) {
        //     wsConnection.id = message.message;
        // }


        // //Broadcasting the message
        // ws.clients.forEach(client => {
        //     if (client != wsConnection) {
        //         console.log(client.id)
        //         // console.log(client._socket)
        //         // console.log(client._socket.remoteAddress)
        //         // console.log(client)

        //         // console.log(client);
        //         // wsConnection.send(client)
        //         // client.send(`You sent: ${message}`)
        //     }
        // })
    })


});




//Routes


const port = 5000;
app.listen(port, () => console.log(`Spy Server started on port ${port}`));

