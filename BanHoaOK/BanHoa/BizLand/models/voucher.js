let mongoose = require('mongoose');

// Voucher Schema
let VoucherSchema = mongoose.Schema({
    id:{
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    discount: {
        type: Number,
        required: false
    },
    money: {
        type: Number,
        required: true
    },
    max: {
        type: Number,
        required: true
    },
    deadline: {
        type: String,
        required: true
    },
    limit: {
        type: Number,
        required: true
    },
    count: {
        type: Number,
        required: true
    }
});

let Voucher = module.exports = mongoose.model('vouchers', VoucherSchema);