const express = require('express')

const app = express();

const bodyParser = require('body-parser');

const cors = require('cors');
const http = require('http')

app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())


const WebSocket = require('ws');
// const { connection } = require('mongoose');
// const server = http.createServer(app);

const ws = new WebSocket.Server({ port: 5001 });


ws.on('connection', function connection(wsConnection) {

    wsConnection.on('message', message => {
        console.log(`Server received: ${message}`);


        //Broadcasting the message
        ws.clients.forEach(client => {
            if (client != wsConnection) {
                // console.log(client);
                // wsConnection.send(client)
                // client.send(`You sent: ${message}`)
            }
        })
    })


});




//Routes


const port = 5000;
app.listen(port, () => console.log(`Spy Server started on port ${port}`));

