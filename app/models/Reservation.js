const mongoose = require('mongoose');

const reservationSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Customer"
    },
    roomId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Room"
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    hasCarpark: {
        type: Boolean,
        required: true
    },
    totalPrice: {
        type: Number,
        required: false
    },
    selectedExtras: {
        type: [mongoose.Schema.Types.ObjectId],
        required: false
    }
});

module.exports = mongoose.model('Reservation', reservationSchema);
