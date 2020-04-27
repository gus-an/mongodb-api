const mongoose = require('mongoose');

const { Schema } = mongoose;
const didSchema = new Schema({
    address: {
        type: String,
        required: true,
        unique: true,
    },
    valid: {
        type: Boolean,
        required: true,
    },
    iAt: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('Did', didSchema);