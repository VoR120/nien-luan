const express = require('express');
const { userRegister, userLogin, userLogout, userInfo } = require('../controllers/userCtrller');
const { requireLogin } = require('../middleware/auth');

const Router = express.Router();

Router.post('/register', userRegister);
Router.post('/login', userLogin);
Router.get('/logout', userLogout);
Router.get('/info', requireLogin, userInfo);

module.exports = Router;