const { addProduct, getProduct, updateProduct, deleteProduct, getProductDetail, ratingProduct } = require('../controllers/productCtrller');
const express = require('express');
const { requireLogin, requireAdmin } = require('../middleware/auth');
const Router = express.Router();
const multer = require('multer');
const path = require('path');
const { nanoid } = require('nanoid');

Router.get('/product/get', getProduct);
Router.get('/product/:slug', getProductDetail);
Router.post('/product/add', requireLogin, requireAdmin, addProduct);
Router.delete('/product/:id', requireLogin, requireAdmin, deleteProduct);
Router.put('/product/:id', requireLogin, requireAdmin, updateProduct);

module.exports = Router;