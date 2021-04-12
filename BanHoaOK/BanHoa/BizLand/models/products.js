let mongoose = require('mongoose');

// Article Schema
let ProductSchema = mongoose.Schema({
    id:{
        type: String,
        required: true
    },
    sup_id: {
        type: String,
        required: true
    },
    cate_id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: true
    },
    unitsinstock: {
        type: Number,
        required: true
    }
});

let Product = module.exports = mongoose.model('products', ProductSchema);