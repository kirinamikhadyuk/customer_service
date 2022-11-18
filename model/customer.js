const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const CustomerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: false
    }
});

exports.CustomerSchema = CustomerSchema;