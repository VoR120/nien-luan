const express = require('express');
const { addAddress, getAddress } = require('../controllers/addressCtrller');
const { requireLogin, requireUser } = require('../middleware/auth');

const Router = express.Router();

Router.post('/user/address/create', requireLogin, requireUser, addAddress);
Router.get('/user/address/get', requireLogin, requireUser, getAddress);

module.exports = Router