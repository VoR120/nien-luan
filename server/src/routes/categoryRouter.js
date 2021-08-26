const { getCategory, addCategory, deleteCategory, updateCategory } = require('../controllers/categoryCtrller');
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

Router.get('/category/get', getCategory);
Router.post('/category/add', requireLogin, requireAdmin, addCategory)
Router.delete('/category/:id', requireLogin, requireAdmin, deleteCategory);
Router.put('/category/:id', requireLogin, requireAdmin, updateCategory);

module.exports = Router;