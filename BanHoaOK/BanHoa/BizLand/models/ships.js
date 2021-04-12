let mongoose = require('mongoose');

// Article Schema
let ShipSchema = mongoose.Schema({
    id:{
        type: String,
        required: true
    },
    name: {
        type: String,
        required: false
    },
    phone: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: false
    },
    identity: {
        type: String,
        required: false
    }
});

let Ship = module.exports = mongoose.model('ship', ShipSchema);