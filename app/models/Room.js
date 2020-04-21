const mongoose = require('mongoose');

const roomSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String
    },
    floor: {
        type: Number,
        required: true
    },
    number: {
        type: Number,
        required: true
    },
    roomType: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "RoomType"
    },
    extraServices: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: "ExtraService" }],
        required: true
    },
    photo: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Room', roomSchema);
