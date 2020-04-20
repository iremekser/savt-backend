// models
const mongoose = require('mongoose');
const Reservation = require('../models/Reservation');
const Customer = require('../models/Customer');
const Room = require('../models/Room');

// enums
const ReservationEnums = require('../enums/reservationEnums');
const CustomerEnums = require('../enums/customerEnums');

exports.find = async (req, res) => {
    try {
        const findReservation = await Reservation.findOne({ _id: req.params.id });
        if (!findReservation) {
            return res.status(404).json({
                message: ReservationEnums.NOT_FOUND
            });
        }
        return res.status(200).json({ findReservation });
    } catch (error) {
        return res.status(500).json({ ...error })
    }
}
exports.create = async (req, res) => {
    try {
        const k = (new Date(req.body.endDate) - new Date(req.body.startDate)) / 60 / 60 / 24 / 1000;
        const room = await Room.findOne({ _id: req.body.roomId }).populate("roomType").populate("extraServices");
        let total = room.roomType.price * k;
        room.extraServices.forEach(n => {
            total += n.price * k
        });
        if (req.body.hasCarpark)
            total += 10 * k;
        const reservation = new Reservation({
            _id: new mongoose.Types.ObjectId(),
            customerId: req.body.customerId,
            roomId: req.body.roomId,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            hasCarpark: req.body.hasCarpark,
            totalPrice: total
        })
        const savedReservation = await reservation.save();
        return res.status(200).json({
            savedReservation
        });
    } catch (error) {
        return res.status(500).json({ ...error })
    }
}
exports.list = async (req, res) => {
    try {
        let listedReservation;
        let query = {};
        if (req.query.email) {
            const customer = await Customer.findOne({ email: req.query.email });
            query = { customerId: customer._id }
            if (!customer)
                return res.status(404).json({ message: CustomerEnums.NOT_FOUND });
        }

        listedReservation = await Reservation.find(query);
        return res.status(200).json({
            listedReservation
        });
    } catch (error) {
        return res.status(500).json({ ...error })
    }
}

exports.update = async (req, res) => {
    try {
        const existReservation = await Reservation.findOne({ _id: req.params.id });
        if (!existReservation) {
            return res.status(404).json({
                message: ReservationEnums.NOT_FOUND
            })
        }
        await Reservation.findOneAndUpdate({ _id: req.params.id },
            {
                $set: {
                    ...existReservation._doc,
                    ...req.body
                }
            }
        )
        return res.status(200).json({
            message: ReservationEnums.UPDATED
        })
    } catch (error) {
        return res.status(500).json({ ...error })
    }
}
exports.delete = async (req, res) => {
    try {
        const reservation = await Reservation.findOne({ _id: req.params.id });
        if (!reservation)
            return res.status(404).json({ message: ReservationEnums.NOT_FOUND });
        await Reservation.findOneAndDelete({ _id: req.params.id })
        return res.status(200).json({ message: ReservationEnums.DELETED });
    } catch (error) {
        return res.status(500).json({ ...error });
    }
}

