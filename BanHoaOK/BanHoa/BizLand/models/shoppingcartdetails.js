let mongoose = require('mongoose');

// Article Schema
let ShoppingcartdetailSchema = mongoose.Schema({
    shoppingcart_id:{
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

let ShoppingCartDetail = module.exports = mongoose.model('shoppingcartdetails', ShoppingcartdetailSchema);