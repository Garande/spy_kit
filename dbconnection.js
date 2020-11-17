const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/spydb", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to the db")
    }).catch((error) => {
        console.error(error)
    })