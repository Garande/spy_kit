const mongoose = require('mongoose');
const devicesSchema = mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: false,
    },
    model: {
        type: String,
        required: false,
    },
    manufacturer: {
        type: String,
        required: false,
    },
    imeis: {
        type: String,
        required: false,
    },
    ipAddress: {
        type: String,
        required: true,
    },
    macAddress: {
        type: String,
        required: false,
    },
    os: {
        type: Object,
        required: false,
    },
    creationDateTimeMillis: {
        type: Number,
        required: false,
    },
    lastUpdateDateTimeMillis: {
        type: Number,
        required: true
    }
})


const devicePhoneNumbers = mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: Number,
        required: true,
    },
    carrier: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: false
    }
})

const Devices = mongoose.model('Devices', devicesSchema);

const PhoneNumbers = mongoose.model('PhoneNumbers', devicePhoneNumbers);


module.exports = { Devices, PhoneNumbers };