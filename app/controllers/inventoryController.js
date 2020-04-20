// models
const mongoose = require('mongoose');
const Inventory = require('../models/Inventory');

// enums
const InventoryEnums = require('../enums/inventoryEnums');

exports.find = async (req, res) => {
    try {
        const inventory = await Inventory.findOne({ _id: req.params.id });
        if (!inventory)
            return res.status(404).json({ message: InventoryEnums.NOT_FOUND })
        return res.status(200).json({ inventory })

    } catch (error) {
        return res.status(500).json({ ...error });
    }
}
exports.create = async (req, res) => {
    try {
        const inventory = new Inventory({
            name: req.body.name,
            price: req.body.price,
            amount: req.body.amount,
            limit: req.body.limit
        })
        const savedInventory = await inventory.save();
        return res.status(200).json({
            savedInventory
        })
    } catch (error) {
        return res.status(500).json({ ...error });
    }
}
exports.list = async (req, res) => {
    try {
        const inventory = await Inventory.find({})
        return res.status(200).json({ inventory });
    } catch (error) {
        return res.status(500).json({ ...error });
    }
}
exports.update = async (req, res) => {
    try {
        const existInventory = await Inventory.findOne({ _id: req.params.id });
        if (!existInventory)
            return res.status(404).json({ message: InventoryEnums.NOT_FOUND });

        const inventory = await Inventory.findOneAndUpdate({ _id: req.params.id },
            {
                $set: {
                    ...existInventory._doc,
                    ...req.body
                }
            }
        );
        return res.status(200).json({ message: InventoryEnums.UPDATED });
    } catch (error) {
        return res.status(500).json({ ...error });
    }
}
exports.delete = async (req, res) => {
    try {
        const inventory = await Inventory.findOne({ _id: req.params.id });
        if (!inventory)
            return res.status(404).json({ message: InventoryEnums.NOT_FOUND });
        await Inventory.findOneAndDelete({ _id: req.params.id })
        return res.status(200).json({ message: InventoryEnums.DELETED });
    } catch (error) {
        return res.status(500).json({ ...error });
    }
}

