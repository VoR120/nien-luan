const { getCustomer } = require('../controllers/customerCtrller');
const express = require('express');
const { requireLogin, requireAdmin } = require('../middleware/auth');
const Router = express.Router();

Router.get('/customer/get', requireLogin, requireAdmin, getCustomer);

module.exports = Router;