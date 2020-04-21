// models
const mongoose = require('mongoose');
const Customer = require('../models/Customer');

// enums
const customerEnums = require('../enums/customerEnums');

exports.find = async (req, res) => {
  try {
    const customer = await Customer.findOne({ _id: req.body.id });
    if (!customer)
      return res.status(404).json({ message: customerEnums.NOT_FOUND });
    return res.status(200).json({ customer });

  } catch (error) {
    return res.status(500).json({ ...error });
  }
};
exports.create = async (req, res) => {
  const existCustomer = await Customer.findOne({ email: req.body.email });
  if (existCustomer)
    return res.status(200).json({ user: existCustomer });
  const customer = new Customer({
    _id: new mongoose.Types.ObjectId(),
    fullName: req.body.fullName,
    email: req.body.email,
    mobile: req.body.mobile
  });
  try {
    const savedCustomer = await customer.save();
    return res.status(200).json({
      user: savedCustomer
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
    const customers = await Customer.find({});
    return res.status(200).json({ customers });
  } catch (error) {
    return res.status(500).json({ ...error });
  }
}
exports.update = async (req, res) => {
  try {
    const existCustomer = await Customer.findOne({ _id: req.params.id });
    if (!existCustomer) {
      return res.status(404).json({
        message: CustomerEnums.NOT_FOUND
      })
    }
    await Customer.findOneAndUpdate({ _id: req.params.id },
      {
        $set: {
          ...existCustomer._doc,
          ...req.body
        }
      }
    )
    return res.status(200).json({
      message: CustomerEnums.UPDATED
    })
  } catch (error) {
    return res.status(500).json({ ...error })
  }
}
exports.delete = async (req, res) => {
  try {
    const customer = await Customer.findOne({ _id: req.params.id });
    if (!customer)
      return res.status(404).json({ message: CustomerEnums.NOT_FOUND });
    await Customer.findOneAndDelete({ _id: req.params.id })
    return res.status(200).json({ message: CustomerEnums.DELETED });
  } catch (error) {
    return res.status(500).json({ ...error });
  }
}