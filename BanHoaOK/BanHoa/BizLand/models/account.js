let mongoose = require('mongoose');

// Article Schema
let AccountSchema = mongoose.Schema({
    id:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    type: {
        type: Number,
        require: true
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        required: false
    },
    membership: {
        type: Number,
        require: false
    },
    OTP: {
        type: String,
        required: false
    },
    OTP_expired: {
        type: String,
        required: false
    }
});

let Account = module.exports = mongoose.model('accounts', AccountSchema);