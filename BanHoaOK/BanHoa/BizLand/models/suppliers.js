let mongoose = require('mongoose');

// Article Schema
let SupplierSchema = mongoose.Schema({
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

let Supplier = module.exports = mongoose.model('suppliers', SupplierSchema);