const mongoose = require('mongoose');
const { Schema } = mongoose;

const receipientSchema = new Schema({
    email: String,
    responded: { type: Boolean, default: false }
});

module.exports = receipientSchema;