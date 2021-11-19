const express = require('express');
const Router = express.Router();
const User = require('../models/userModel');
const Order = require('../models/orderModel');
const Product = require('../models/productModel');

Router.get('/statistics/getcustomer', async (req, res) => {
    try {
        const data = await User.find({})
        res.status(200).json({ data: data.length })
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
});


Router.get('/statistics/getorder', async (req, res) => {
    try {
        const data = await Order.find({})
        res.status(200).json({ data: data.length })
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
});

Router.get('/statistics/getproduct', async (req, res) => {
    try {
        const data = await Product.find({})
        res.status(200).json({ data: data.length })
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
});

module.exports = Router;