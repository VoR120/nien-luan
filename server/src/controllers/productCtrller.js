const Product = require('../models/productModel');
const slugify = require('slugify');
const fs = require('fs');
const path = require('path');

exports.addProduct = async (req, res) => {
    try {
        const { name, category, } = req.body;
        const slug = slugify(name);
        let productImages = [];
        if (req.files.length > 0) {
            productImages = req.files.map(file => {
                return { img: path.join(process.env.APP_URL, 'public', file.filename) }
            })
        }

        const product = new Product({
            name,
            slug,
            // price,
            // description,
            // quantity,
            category,
            productImages,
            createdBy: req.user._id
        })
        await product.save((error, data) => {
            if (error) {
                if (req.files) {
                    req.files.map(file => {
                        fs.unlink(path.join('public/uploads', file.filename), err => {
                            if (err)
                                return res.json({ err });
                        })
                    })
                }
                return res.json(error);
            }
            if (data) {
                return res.status(201).json({
                    msg: "Thành công!",
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
        const { name } = req.body;
        const slug = slugify(name);
        await Product.findByIdAndUpdate({ _id: req.params.id }, { name, slug });
        res.status(200).json({ msg: "Thành công!" })
    } catch (error) {
        return res.status(400).json({ msg: error.message });
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete({ _id: req.params.id });
        res.status(200).json({ msg: "Thành công!" })
    } catch (error) {
        return res.status(400).json({ msg: error.message });
    }
}