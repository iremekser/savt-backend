// models
const mongoose = require('mongoose');
const ExtraService = require('../models/ExtraService');

// enums
const ExtraServiceEnums = require('../enums/extraServiceEnums');

exports.find = async (req, res) => {
    try {
        const findExtraService = await ExtraService.findOne({ _id: req.params.id });
        if (!findExtraService) {
            return res.status(404).json({
                message: ExtraServiceEnums.NOT_FOUND
            });
        }
        return res.status(200).json({ findExtraService });
    } catch (error) {
        return res.status(500).json({ ...error })
    }
}
exports.create = async (req, res) => {
    try {
        const extraService = new ExtraService({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            price: req.body.price
        })
        const savedExtraService = await extraService.save();
        return res.status(200).json({
            savedExtraService
        });
    } catch (error) {
        return res.status(500).json({ ...error })
    }
}
exports.list = async (req, res) => {
    try {
        const listedExtraService = await ExtraService.find({});
        return res.status(200).json({
            listedExtraService
        });
    } catch (error) {
        return res.status(500).json({ ...error })
    }
}

exports.update = async (req, res) => {
    try {
        const existExtraService = await ExtraService.findOne({ _id: req.params.id });
        if (!existExtraService) {
            return res.status(404).json({
                message: ExtraServiceEnums.NOT_FOUND
            })
        }
        await ExtraService.findOneAndUpdate({ _id: req.params.id },
            {
                $set: {
                    ...existExtraService._doc,
                    ...req.body
                }
            }
        )
        return res.status(200).json({
            message: ExtraServiceEnums.UPDATED
        })
    } catch (error) {
        return res.status(500).json({ ...error })
    }
}
exports.delete = async (req, res) => {
    try {
        const extraService = await ExtraService.findOne({ _id: req.params.id });
        if (!extraService)
            return res.status(404).json({ message: ExtraServiceEnums.NOT_FOUND });
        await ExtraService.findOneAndDelete({ _id: req.params.id })
        return res.status(200).json({ message: ExtraServiceEnums.DELETED });
    } catch (error) {
        return res.status(500).json({ ...error });
    }
}
