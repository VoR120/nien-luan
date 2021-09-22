const express = require('express');
const { addOrder, getOrder, getAllOrder } = require('../controllers/orderCtrller');
const { requireLogin, requireUser, requireAdmin } = require('../middleware/auth');

const Router = express.Router();

Router.post('/addOrder', requireLogin, requireUser, addOrder);
Router.get('/getOrder', requireLogin, requireUser, getOrder);
Router.get('/getAllOrder', requireLogin, requireAdmin, getAllOrder);

module.exports = Router;