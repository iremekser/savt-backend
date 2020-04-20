const mongoose = require('mongoose');

const roomTypeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    bedCount: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('RoomType', roomTypeSchema);
