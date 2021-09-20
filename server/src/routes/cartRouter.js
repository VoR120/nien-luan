const express = require('express');
const { addToCart, getCart, deleteCart, destroyCart } = require('../controllers/cartCtrller');
const { requireLogin, requireUser } = require('../middleware/auth');

const Router = express.Router();

Router.post('/cart/addtocart', requireLogin, requireUser, addToCart);
Router.get('/cart/get', requireLogin, requireUser, getCart);
Router.delete('/cart/destroy', requireLogin, requireUser, destroyCart);
Router.delete('/cart/:id', requireLogin, requireUser, deleteCart);

module.exports = Router;