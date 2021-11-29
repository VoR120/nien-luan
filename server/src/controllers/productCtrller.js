const Product = require('../models/productModel');
const Category = require("../models/categoryModel");
const slugify = require('slugify');
const path = require('path');

class APIfeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }
    filtering() {
        const queryObj = { ...this.queryString };

        const excludedFields = ['sort', 'limit']
        excludedFields.forEach(el => delete (queryObj[el]))

        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match);

        this.query.find(JSON.parse(queryStr)).populate("category");
        return this;
    }
    sorting() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy);
        } else {
            this.query = this.query.sort('-createdAt');
        }

        return this;
    }
}

exports.getProduct = async (req, res) => {
    try {
        // console.log(req.query.category);
        if (req.query.category)
            req.query.category = await Category.findOne({ slug: req.query.category });
        const features = new APIfeatures(Product.find({ isDeleted: false }), req.query).filtering().sorting();
        const product_db = await features.query;
        res.status(200).json({ product_db })
    } catch (error) {
        return res.status(400).json({ msg: error.message });
    }
}

exports.addProduct = async (req, res) => {
    try {
        const { name, category, price, quantity, description, size, weight, brand, magnet, productImages } = req.body;
        const slug = slugify(name, { lower: true });
        const categoryFull = await Category.findById(category);

        const product = new Product({
            name, slug, price, description, quantity, size, weight, brand, magnet,
            category: categoryFull,
            productImages: JSON.parse(productImages),
            createdBy: req.user.id
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


exports.updateProduct = async (req, res) => {
    try {
        const { name, category, productImages } = req.body;
        let noUnArr = {};
        for (const [key, value] of Object.entries(req.body)) {
            if (value != 'undefined') {
                noUnArr[key] = value;
            }
        }
        let updateArr = new Object();
        updateArr = { ...noUnArr, slug: slugify(name, { lower: true }) }
        updateArr.productImages = JSON.parse(productImages);

        const product = await Product.findByIdAndUpdate(
            { _id: req.params.id },
            updateArr,
            { new: true }
        );
        const categoryFull = await Category.findById(category);
        let pro = new Object(product)
        pro.category = categoryFull;
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
        const product_db = await Product.findByIdAndUpdate({ _id: req.params.id }, { isDeleted: true });
        res.status(200).json({ msg: "Thành công!", data: product_db })
    } catch (error) {
        return res.status(400).json({ msg: error.message });
    }
}

exports.getProductDetail = async (req, res) => {
    try {
        const product_db = await Product.findOne({ slug: req.params.slug }).populate('category');
        res.status(200).json({ msg: "Thành công!", product: product_db })
    } catch (error) {
        return res.status(400).json({ msg: error.message });
    }
}