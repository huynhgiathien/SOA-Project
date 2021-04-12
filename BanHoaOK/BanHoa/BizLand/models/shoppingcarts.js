let mongoose = require('mongoose');

// Article Schema
let ShoppingCartSchema = mongoose.Schema({
    id:{
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    }
});

let ShoppingCart = module.exports = mongoose.model('shoppingcarts', ShoppingCartSchema);