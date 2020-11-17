const express = require('express')

const app = express();

const bodyParser = require('body-parser');

const cors = require('cors');

app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())


//Routes


const port = 5000;
app.listen(port, () => console.log(`Spy Server started on port ${port}`));

