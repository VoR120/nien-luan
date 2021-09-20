const { getCategory, addCategory, deleteCategory, updateCategory } = require('../controllers/categoryCtrller');
const express = require('express');
const { requireLogin, requireAdmin } = require('../middleware/auth');
const Router = express.Router();

Router.get('/category/get', getCategory);
Router.post('/category/add', requireLogin, requireAdmin, addCategory)
Router.delete('/category/:id', requireLogin, requireAdmin, deleteCategory);
Router.put('/category/:id', requireLogin, requireAdmin, updateCategory);

module.exports = Router;