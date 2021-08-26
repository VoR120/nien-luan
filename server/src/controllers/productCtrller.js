const Product = require('../models/productModel');
const Category = require("../models/categoryModel");
const slugify = require('slugify');
const fs = require('fs');
const path = require('path');

exports.addProduct = async (req, res) => {
    try {
        const { name, category, productImages } = req.body;
        const slug = slugify(name);
        const categoryFull = await Category.findById(category);

        const product = new Product({
            name,
            slug,
            // price,
            // description,
            // quantity,
            category: categoryFull,
            productImages: JSON.parse(productImages),
            createdBy: req.user._id
        })
        await product.save((error, data) => {
            if (error) {
                return res.json(error);
            }
            if (data) {
                return res.status(201).json({
                    msg: "Thành công!",
                    product: data
                })
            }
        })
    } catch (error) {
        return res.status(400).json({ msg: error.message });
    }
}

exports.getProduct = async (req, res) => {
    try {
        const product_db = await Product.find();
        res.status(200).json({ product_db })
    } catch (error) {
        return res.status(400).json({ msg: error.message });
    }
}

exports.updateProduct = async (req, res) => {
    try {
        const { name, category, productImages } = req.body;
        const categoryFull = await Category.findById(category);
        const slug = slugify(name);
        const product = await Product.findByIdAndUpdate(
            { _id: req.params.id },
            { name, slug, category: categoryFull , productImages: JSON.parse(productImages) },
            { new: true }
        );
        let pro = new Object(product)
        pro.category = categoryFull;
        console.log(pro);
        res.status(200).json({
            msg: "Thành công!",
            product: pro
        })
    } catch (error) {
        return res.status(400).json({ msg: error.message });
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        const product_db = await Product.findByIdAndDelete({ _id: req.params.id });
        res.status(200).json({ msg: "Thành công!",data: product_db })
    } catch (error) {
        return res.status(400).json({ msg: error.message });
    }
}
