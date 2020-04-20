// models
const mongoose = require('mongoose');
const RoomType = require('../models/RoomType');

// enums
const roomTypeEnums = require('../enums/roomTypeEnums');

exports.find = async (req, res) => {
  try {
    const roomType = await RoomType.findOne({ _id: req.params.id });
    if (!roomType)
      return res.status(404).json({ message: roomTypeEnums.NOT_FOUND });
    return res.status(200).json({ roomType });
  } catch (error) {
    return res.status(500).json({ ...error });
  }
};
exports.create = async (req, res) => {
  const existRoomType = await RoomType.findOne({ name: req.body.name });
  if (existRoomType != null) {
    return res.status(422).json({
      message: roomTypeEnums.ALREADY_EXIST
    });
  }
  const roomType = new RoomType({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
    bedCount: req.body.bedCount
  });
  try {
    const savedRoomType = await roomType.save();
    return res.status(200).json({
      savedRoomType
    });
  }
  catch (err) {
    return res.status(500).json({
      ...err
    });
  }
};
exports.list = async (req, res) => {
  try {
    const roomType = await RoomType.find({});
    return res.status(200).json({ roomType });
  } catch (error) {
    return res.status(500).json({ ...error });
  }
};
exports.update = async (req, res) => {
  try {

    const existRoomType = await RoomType.findOne({ _id: req.params.id });
    console.log(existRoomType);
    if (!existRoomType) {
      return res.status(404).json({
        message: roomTypeEnums.NOT_FOUND
      });
    }
    await RoomType.findOneAndUpdate({ _id: req.params.id },
      {
        $set: {
          ...existRoomType._doc,
          ...req.body
        }
      }
    )
    return res.status(200).json({
      message: roomTypeEnums.UPDATED
    });
  }
  catch (err) {
    return res.status(500).json({
      ...err
    });
  }
};
exports.delete = async (req, res) => {
  try {
    const roomType = await RoomType.findOne({ _id: req.params.id });
    if (!roomType)
      return res.status(404).json({ message: RoomTypeEnums.NOT_FOUND });
    await RoomType.findOneAndDelete({ _id: req.params.id })
    return res.status(200).json({ message: RoomTypeEnums.DELETED });
  } catch (error) {
    return res.status(500).json({ ...error });
  }
}