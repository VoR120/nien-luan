const { populate } = require('../models/orderModel');
const Order = require('../models/orderModel');
const Product = require('../models/productModel');

exports.addOrder = async (req, res) => {
    try {
        req.body.paymentStatus = "pending";
        req.body.orderStatus = [
            {
                type: "ordered",
                date: new Date(),
                isCompleted: true
            },
            {
                type: "packed",
                date: new Date(),
                isCompleted: false
            },
            {
                type: "shipped",
                date: new Date(),
                isCompleted: false
            },
            {
                type: "delivered",
                date: new Date(),
                isCompleted: false
            },
        ]
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
        const order_db = await Order.find({ user: req.user.id }).sort({ createdAt: -1 })
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
            .populate("items.productId", "_id name productImages").sort({ createdAt: -1 })
            .populate("user", "_id fullName email")
        console.log(order_db);
        if (order_db) {
            res.status(200).json({ msg: "Thành công", order: order_db })
        }
    } catch (error) {
        return res.status(400).json({ msg: error.message })
    }
}

const getTypeStatus = (type) => {
    switch (type) {
        case "delivered":
            return {
                "$set": {
                    "orderStatus.$": [{ type: type, date: new Date(), isCompleted: true }],
                    paymentStatus: "completed"
                }
            }
            break;
        case "cancelled":
            return {
                "$set": {
                    paymentStatus: "cancelled"
                }
            }
        default:
            return {
                "$set": {
                    "orderStatus.$": [{ type: type, date: new Date(), isCompleted: true }],
                }
            }
            break;
    }
}

exports.updateOrder = async (req, res) => {
    const { _id, items, type } = req.body;
    try {
        const setValue = getTypeStatus(type);
        console.log(setValue);
        const order_db = await Order.findOneAndUpdate({ _id, "orderStatus.type": type }, setValue, { new: true })
            .populate("items.productId", "_id name productImages")
            .populate("user", "_id fullName email")

        console.log(order_db);
        if (order_db) {
            if (type == "delivered") {
                await Promise.all(items.map(async el => {
                    const product_db = await Product.findOne({ _id: el.productId._id })
                    console.log(product_db);
                    await Product.findOneAndUpdate({ _id: el.productId._id }, {
                        "$set": {
                            quantity: product_db.quantity - Number(el.quantity),
                            offer: (product_db.offer || 0) + Number(el.quantity)
                        }
                    })
                }))
            }
            res.status(200).json({ msg: "Thành công", order: order_db })
        }
    } catch (error) {
        return res.status(400).json({ msg: error.message })
    }
}

exports.cancelOrder = async (req, res) => {
    const { _id, type } = req.body;
    try {
        const setValue = getTypeStatus(type);
        console.log(setValue);
        const order_db = await Order.findOneAndUpdate({ _id }, setValue, { new: true })
        // .populate("items.productId", "_id name productImages")
        // .populate("user", "_id fullName email")

        console.log(order_db);
        if (order_db) {
            res.status(200).json({ msg: "Thành công" })
        }
    } catch (error) {
        return res.status(400).json({ msg: error.message })
    }
}