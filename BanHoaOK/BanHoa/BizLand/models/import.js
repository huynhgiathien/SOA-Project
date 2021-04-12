let mongoose = require('mongoose');

// Article Schema
let ImportlSchema = mongoose.Schema({
    supplier_id:{
        type: String,
        required: true
    },
    product_id:{
        type: String,
        required: true
    },
    date:{
        type: String,
        required: true
    },
    quantity:{
        type: Number,
        required: true
    }
});

let Import = module.exports = mongoose.model('imports', ImportlSchema);