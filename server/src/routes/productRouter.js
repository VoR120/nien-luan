const {  addProduct, getProduct, updateProduct, deleteProduct } = require('../controllers/productCtrller');
const express = require('express');
const { requireLogin, requireAdmin } = require('../middleware/auth');
const Router = express.Router();
const multer = require('multer');
const path = require('path');
const { nanoid } = require('nanoid');

// Thư mục lưu ảnh
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads');
    },
    filename: function (req, file, cb) {
        cb(null, nanoid() + '-' + file.originalname);
    }
})
const upload = multer({ storage })

Router.get('/product/get', getProduct);
Router.post('/product/add', requireLogin, requireAdmin, upload.array('productImages'), addProduct)
Router.delete('/product/:id', requireLogin, requireAdmin, deleteProduct);
Router.put('/product/:id', requireLogin, requireAdmin, updateProduct);

module.exports = Router;