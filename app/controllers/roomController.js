// models
const mongoose = require('mongoose');
const Room = require('../models/Room');

// enums
const RoomEnums = require('../enums/roomEnums');

exports.find = async (req, res) => {
  try {
    const findRoom = await Room.findOne({ _id: req.params.id }).populate("roomType").populate("extraServices");
    if (!findRoom) {
      return res.status(404).json({
        message: RoomEnums.NOT_FOUND
      });
    }
    return res.status(200).json({ findRoom });
  } catch (error) {
    return res.status(500).json({ ...error })
  }
}
exports.create = async (req, res) => {
  try {
    const existRoom = await Room.findOne({ number: req.body.number });
    if (existRoom) {
      return res.status(422).json({
        message: RoomEnums.ALREADY_EXIST
      })
    }
    const room = new Room({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      floor: req.body.floor,
      number: req.body.number,
      roomType: req.body.roomTypeId,
      extraServices: req.body.extraServicesIds,
      photo: req.body.photo
    })
    const savedRoom = await room.save();
    return res.status(200).json({
      savedRoom
    });
  } catch (error) {
    return res.status(500).json({ ...error })
  }
}
exports.list = async (req, res) => {
  try {
    const listedRoom = await Room.find({}).populate("extraServices").populate("roomType");
    return res.status(200).json({
      listedRoom
    });
  } catch (error) {
    return res.status(500).json({ ...error })
  }
}

exports.update = async (req, res) => {
  try {
    const existRoom = await Room.findOne({ _id: req.params.id });
    if (!existRoom) {
      return res.status(404).json({
        message: RoomEnums.NOT_FOUND
      })
    }
    await Room.findOneAndUpdate({ _id: req.params.id },
      {
        $set: {
          ...existRoom._doc,
          ...req.body
        }
      }
    )
    return res.status(200).json({
      message: RoomEnums.UPDATED
    })
  } catch (error) {
    return res.status(500).json({ ...error })
  }
}
exports.delete = async (req, res) => {
  try {
    const room = await Room.findOne({ _id: req.params.id });
    if (!room)
      return res.status(404).json({ message: RoomEnums.NOT_FOUND });
    await Room.findOneAndDelete({ _id: req.params.id })
    return res.status(200).json({ message: RoomEnums.DELETED });
  } catch (error) {
    return res.status(500).json({ ...error });
  }
}
