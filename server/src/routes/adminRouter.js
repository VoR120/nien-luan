const express = require('express');
const { adminRegister, adminLogin, adminLogout, adminInfo } = require('../controllers/adminCtrller');
const { requireLogin } = require('../middleware/auth');

const Router = express.Router();

Router.post('/register', adminRegister);
Router.post('/login', adminLogin);
Router.get('/logout', adminLogout);
Router.get('/info', requireLogin, adminInfo);

module.exports = Router;