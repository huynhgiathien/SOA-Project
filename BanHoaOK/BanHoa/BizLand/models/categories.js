let mongoose = require('mongoose');

// Article Schema
let CategorySchema = mongoose.Schema({
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

let Category = module.exports = mongoose.model('categories', CategorySchema);