const express = require('express');
const { addToCart } = require('../controllers/cartCtrller');
const { requireLogin, requireUser } = require('../middleware/auth');

const Router = express.Router();

Router.post('/cart/addtocart', requireLogin, requireUser, addToCart);

module.exports = Router;