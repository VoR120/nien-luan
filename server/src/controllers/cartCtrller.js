const Cart = require('../models/cartModel');
const Product = require('../models/productModel');

exports.addToCart = async (req, res) => {
    try {
        const cart_db = await Cart.findOne({ user: req.user.id });
        if (cart_db) {
            // Nếu tìm thấy giỏ hàng => Cập nhật
            const product = req.body.cartItems.product._id
            const item = await cart_db.cartItems.find(c => c.product == product);
            let condition, update;

            if (item) {
                // Nếu món hàng đã tồn tại => Cập nhật số lượng
                condition = { user: req.user.id, 'cartItems.product': product };
                update = {
                    '$set': {
                        'cartItems.$': {
                            ...req.body.cartItems,
                            quantity: req.body.cartItems.quantity
                            // quantity: item.quantity + req.body.cartItems.quantity
                        }
                    }
                }
                const cart_db = await Cart.findOneAndUpdate(condition, update);
                res.status(200).json({
                    message: "Update số lượng thành công!",
                    cart_db
                })
            } else {
                // Nếu không => Thêm vào giỏ hàng
                condition = { user: req.user.id }
                update = {
                    '$push': {
                        cartItems: req.body.cartItems,
                    }
                };
                const cart_db = await Cart.findOneAndUpdate(condition, update);
                res.status(200).json({
                    message: "Update giỏ hàng thành công!",
                    cart_db
                })
            }
        } else {
            // Nếu không => Thêm giỏ hàng mới
            const cart = new Cart({
                user: req.user.id,
                cartItems: req.body.cartItems,
            })

            cartSave = await cart.save();
            res.status(200).json({ msg: "Thành công!", cartSave });
        }
    } catch (error) {
        return res.status(400).json({ msg: error.message })
    }
}

exports.getCart = async (req, res) => {
    try {
        const cart_db = await Cart.findOne({ user: req.user.id });
        if (cart_db) {
            const cart = new Object(cart_db);
            let cartItems = await Promise.all(cart_db.cartItems.map(async (item) => {
                let newItem = new Object(item);
                let pro = await Product.findById(item.product);
                newItem.product = pro;
                return newItem
            }))
            cart.cartItems = cartItems;
            res.status(200).json({ cart_db: cart });
        }
    } catch (error) {
        return res.status(400).json({ msg: error.message })
    }
}

exports.deleteCart = async (req, res) => {
    try {
        const cart_db = await Cart.findOne({ user: req.user.id });
        let cartObj = new Object(cart_db);
        if (cart_db) {
            let newCart = cart_db.cartItems.filter(c => c.product._id != req.params.id);
            cartObj.cartItems = newCart
        }
        const cart = await Cart.findOneAndUpdate({ user: req.user.id }, { cartItems: cartObj.cartItems })
        return res.status(200).json({ cart_db: cart });
    } catch (error) {
        return res.status(400).json({ msg: error.message })
    }
}

exports.destroyCart = async (req, res) => {
    try {
        const cart_db = await Cart.findOneAndUpdate({ user: req.user.id }, { cartItems: [] });
        return res.status(200).json({ msg: "Đã xóa", cart_db: cart_db });
    } catch (error) {
        return res.status(400).json({ msg: error.message })
    }
}