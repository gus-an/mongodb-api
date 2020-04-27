const mongoose = require('mongoose');

const { Schema } = mongoose;
const { Types: { ObjectId } } = Schema;
const vcSchema = new Schema({
    owner: {
        type: ObjectId,
        required: true,
        ref: 'Did',
    },
    vc: {
        type: Object,
        required: true,
    },
});

module.exports = mongoose.model('VC', vcSchema);
