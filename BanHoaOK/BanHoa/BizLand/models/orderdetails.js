let mongoose = require('mongoose');

// Article Schema
let OrderdetailSchema = mongoose.Schema({
    order_id:{
        type: String,
        required: true
    },
    product_id:{
        type: String,
        required: true
    },
    unitprice:{
        type: Number,
        required: true
    },
    quantity:{
        type: Number,
        required: true
    }
});

let OrderDetail = module.exports = mongoose.model('orderdetails', OrderdetailSchema);