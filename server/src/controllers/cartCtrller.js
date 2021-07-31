const Cart = require('../models/cartModel');

exports.addToCart = async (req, res) => {
    try {
        const cart_db = await Cart.findOne({ user: req.user.id });
        // return res.json(cart_db);
        if (cart_db) {
            // Nếu tìm thấy giỏ hàng => Cập nhật
            const product = req.body.cartItems.product
            const item = await cart_db.cartItems.find(c => c.product == product);
            let condition, update;

            if (item) {
                // Nếu món hàng đã tồn tại => Cập nhật số lượng
                condition = { user: req.user.id, 'cartItems.product': product };
                update = {
                    '$set': {
                        'cartItems.$': {
                            ...req.body.cartItems,
                            quantity: item.quantity + req.body.cartItems.quantity
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