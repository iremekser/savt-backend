const mongoose = require('mongoose');

const inventorySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    limit: {
        type: Number,
        required: true
    },
});

module.exports = mongoose.model('Inventory', inventorySchema);
