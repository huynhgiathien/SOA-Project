let mongoose = require('mongoose');

// Article Schema
let OrderSchema = mongoose.Schema({
    id:{
        type: String,
        required: true
    },
    customer_id: {
        type: String,
        required: false
    },
    employee_id: {
        type: String,
        required: false
    },
    order_date: {
        type: String,
        required: true
    },
    ship_date: {
        type: String,
        required: false
    },
    ship_address: {
        type: String,
        required: false
    },
    ship_fee: {
        type: Number,
        required: false
    },
    total_fee:{
        type:Number,
        required: false
    },
    payed:{
        type: Boolean,
        require: true
    },
    status: {
        type: Number,
        require: true
    }
});

let Order = module.exports = mongoose.model('orders', OrderSchema);