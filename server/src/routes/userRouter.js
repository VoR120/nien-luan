const express = require('express');
const { userRegister, userLogin, userLogout, userInfo, rating, getRating, getAllRating, userChangePassword } = require('../controllers/userCtrller');
const { requireLogin, requireUser } = require('../middleware/auth');

const Router = express.Router();

Router.post('/register', userRegister);
Router.post('/login', userLogin);
Router.get('/logout', userLogout);
Router.get('/info', requireLogin, userInfo);
Router.put('/changepassword', requireLogin, requireUser, userChangePassword);
Router.get('/getrating/:id', getAllRating);
Router.post('/getrating/', requireLogin, requireUser, getRating);
Router.post('/rating', requireLogin, requireUser, rating);

module.exports = Router;