const Category = require("../models/categoryModel");
const Product = require("../models/productModel");

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

exports.getInitialData = async (req, res) => {
    const category_db = await Category.find();
    const product_db = await Product.find().populate('category');
    res.status(200).json({ category: createChildCategory(category_db), product: product_db });
}