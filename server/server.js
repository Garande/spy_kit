const express = require('express')

const app = express();

const bodyParser = require('body-parser');

const cors = require('cors');
const http = require('http')

app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())


const WebSocket = require('ws');
const { SET_USERID, SEND_MESSAGE, BROADCAST, GET_CONNECTED_USERS, SUBSCRIBE_TO_USERS, UN_SUBSCRIBE_TO_USERS } = require('./utils/constants');
const { client } = require('websocket');
const Subscription = require('./utils/subscription');
const { error } = require('console');
// const { connection } = require('mongoose');
// const server = http.createServer(app);

const ws = new WebSocket.Server({ port: 5001 });

let userSubscription = new Subscription();




const sendMessage = (message) => {
    ws.clients.forEach(client => {
        if (client.id == message.receiverId) {
            client.send(JSON.stringify(message.payload));
        }
    })
}

const broadCastMessage = (wsConnection, message) => {
    ws.clients.forEach(client => {
        if (wsConnection != client) {
            client.send(JSON.stringify(message));
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



const createUserEventListener = (wsConnection, message) => {
    userSubscription.subscribe(() => getConnectedUsers(wsConnection, { type: GET_CONNECTED_USERS }));
}


const unSubscribeEventListener = (wsConnection) => {
    userSubscription.unsubscribe(() => getConnectedUsers(wsConnection, { type: UN_SUBSCRIBE_TO_USERS }));
}


ws.on('connection', function connection(wsConnection) {


    wsConnection.on('message', message => {


        let data = JSON.parse(message)

        console.log(`Server received: ${data.type}`);

        if (data.type === SET_USERID) {

            wsConnection.id = data.payload;
            console.log(`Server received: ${data.payload}`);
            userSubscription.fire()
        } else if (data.type === SEND_MESSAGE) {
            sendMessage(data)
        } else if (data.type === BROADCAST) {
            broadCastMessage(wsConnection, data)
        } else if (data.type === GET_CONNECTED_USERS) {
            getConnectedUsers(wsConnection, data)
        } else if (data.type === SUBSCRIBE_TO_USERS) {
            createUserEventListener(wsConnection, data);
        } else if (data.type === UN_SUBSCRIBE_TO_USERS) {
            unSubscribeEventListener(wsConnection);
        } else {
            broadCastMessage(wsConnection, data)
        }
    });


    wsConnection.on('close', disconnection => {
        unSubscribeEventListener(wsConnection)
    });

    wsConnection.on('error', error => {
        unSubscribeEventListener(wsConnection)
    })


});




//Routes


const port = 5000;
app.listen(port, () => console.log(`Spy Server started on port ${port}`));

