const Order = require('../models/orderModel');

exports.addOrder = async (req, res) => {
    try {
        req.body.paymentStatus = "pending"
        req.body.user = req.user.id;
        const order = new Order(req.body);
        const order_db = await order.save();
        if (order_db)
            return res.status(201).json({ msg: "Thành công", order: order_db })
    } catch (error) {
        return res.status(400).json({ msg: error.message })
    }
}

exports.getOrder = async (req, res) => {
    try {
        const order_db = await Order.find({ user: req.user._id })
            .populate("items.productId", "_id name productImages");
        if (order_db) {
            res.status(200).json({ msg: "Thành công", order: order_db })
        }
    } catch (error) {
        return res.status(400).json({ msg: error.message })
    }
}

exports.getAllOrder = async (req, res) => {
    try {
        const order_db = await Order.find({})
            // .populate("items.productId", "_id name productImages");
        if (order_db) {
            res.status(200).json({ msg: "Thành công", order: order_db })
        }
    } catch (error) {
        return res.status(400).json({ msg: error.message })
    }
}