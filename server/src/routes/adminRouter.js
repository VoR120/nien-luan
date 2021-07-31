const express = require('express');
const { userRegister, userLogin, userLogout, userInfo } = require('../controllers/userCtrller');
const { requireLogin } = require('../middleware/auth');

const Router = express.Router();

Router.post('admin/register', userRegister);
Router.post('admin/login' , userLogin);
Router.get('admin/logout', userLogout);
Router.get('admin/info', requireLogin, userInfo);

module.exports = Router;