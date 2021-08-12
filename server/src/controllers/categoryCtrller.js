const Category = require("../models/categoryModel");
const slugify = require('slugify');
const fs = require('fs');
const path = require('path');

// Hàm tạo Category có thêm key chidren chứa các obj có parentId == _id
const createChildCategory = (categories, parentId = null) => {
    const categoryList = [];
    let category;

    if (parentId == null) {
        category = categories.filter(cate => cate.parentId == undefined);
    } else {
        category = categories.filter(cate => cate.parentId == parentId);
    }

    for (let c of category) {
        categoryList.push({
            _id: c._id,
            name: c.name,
            slug: c.slug,
            categoryImage: c.categoryImage,
            parentId: c.parentId,
            children: createChildCategory(categories, c._id),
        })
    }
    return categoryList;
}

exports.getCategory = async (req, res) => {
    try {
        const cate_db = await Category.find();
        const category_db = createChildCategory(cate_db);
        res.status(200).json({ category_db });
    } catch (error) {
        return res.status(400).json({ msg: error.message });
    }
}

exports.addCategory = async (req, res) => {
    try {
        const { name, parentId } = req.body;
        const slug = slugify(name);
        let categoryImage;
        if (req.file) {
            const categoryUrl = process.env.APP_URL + 'public/' + req.file.filename;
            categoryImage = categoryUrl;
        }

        const cate = new Category({ name, slug, categoryImage, parentId });
        await cate.save((error, data) => {
            if (error) {
                if (req.file) {
                    fs.unlink(path.join('public/uploads', req.file.filename), err => {
                        if (err)
                            return res.json({ err });
                    })
                }
                return res.json(error);
            }
            if (data) {
                return res.status(201).json({
                    msg: "Thành công!",
                    category: data
                })
            }
        })
    } catch (error) {
        return res.status(400).json({ msg: error.message });
    }
}

exports.deleteCategory = async (req, res) => {
    try {
        await Category.findByIdAndDelete({ _id: req.params.id });
        res.status(200).json({ msg: "Thành công!" })
    } catch (error) {
        return res.status(400).json({ msg: error.message });
    }
}

exports.updateCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const slug = slugify(name);
        await Category.findByIdAndUpdate({ _id: req.params.id }, { name, slug })
        res.status(200).json({ msg: "Thành công!" })
    } catch (error) {
        return res.status(400).json({ msg: error.message });
    }
}