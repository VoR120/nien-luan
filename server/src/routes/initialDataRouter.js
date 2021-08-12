const express = require('express');
const { getInitialData } = require('../controllers/initialDataCtrller');
const Router = express.Router();

Router.get('/initialData/get', getInitialData);

module.exports = Router;