const User = require('../models/userModel');
const Product = require('../models/productModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.userRegister = async (req, res) => {
    try {
        const user_db = await User.findOne({ email: req.body.email })
        if (user_db)
            return res.status(400).json({ msg: "Email đã tồn tại!", type: "email" });
        const phone_number = await User.findOne({ phoneNumber: req.body.phoneNumber });
        if (phone_number)
            return res.status(400).json({ msg: "Số điện thoại đã được sử dụng!", type: "phoneNumber" });

        const { fullName, email, address, phoneNumber, password, role } = req.body;
        const passHash = await bcrypt.hash(password, 10);
        const user = new User({ fullName, email, address, phoneNumber, password: passHash, role });

        await user.save((error, data) => {
            if (error) return res.json(error);
            if (data) {
                // , { expiresIn: '1d' }
                const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET)
                res.cookie('token', token);
                return res.status(201).json({
                    msg: "Đăng ký tài khoản thành công!",
                    data: { token }
                })
            }
        })

    } catch (error) {
        return res.status(500).json({ msg: error.message });

    }
}
exports.userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user_db = await User.findOne({ email });
        if (!user_db) return res.status(400).json({ msg: "Tài khoản không tồn tại!", type: "email" });
        if (user_db.role != "user") return res.status(400).json({ msg: "Tài khoản không tồn tại!", type: "email" });

        const isMatch = await bcrypt.compareSync(password, user_db.password);
        if (!isMatch) return res.status(400).json({ msg: "Mật khẩu không chính xác!", type: "password" });


        const token = jwt.sign({ id: user_db._id }, process.env.TOKEN_SECRET)
        res.cookie('token', token);

        res.status(200).json({ msg: "Đã đăng nhập!", user: user_db, token: token });
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
}

exports.userLogout = async (req, res) => {
    try {
        res.removeItem('token');
        return res.json("Đã đăng xuất!");
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
}

exports.userInfo = async (req, res) => {
    try {
        const user_db = await User.findById(req.user.id);
        if (!user_db) return res.status(400).json({ msg: "Người dùng không tồn tại!" });
        return res.json(user_db);
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
}

exports.rating = async (req, res) => {
    try {
        const rating_db = await Product.findOne({ _id: req.body.id, 'ratings.userId': req.user.id })
        if (rating_db) {
            const ratingUpdate = await Product.findOneAndUpdate({ _id: req.body.id, 'ratings.userId': req.user.id }, {
                '$set': {
                    'ratings.$.rating': req.body.rating
                }
            }, { new: true })
            return res.status(200).json({ ratingUpdate })
        } else {
            const ratingAdd = await Product.findOneAndUpdate({ _id: req.body.id }, {
                '$push': {
                    ratings: {
                        userId: req.user.id,
                        rating: req.body.rating
                    }
                }
            }, { new: true })
            return res.status(200).json({ ratingAdd })
        }
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
}

exports.getRating = async (req, res) => {
    try {
        const rating_db = await Product.findOne({ _id: req.body.productId })
        // let obj;
        // if (rating_db)
        //     Object.keys(rating_db).map(el => {
        //         if (el == "ratings") {
        //             rating_db[el].map(ele => {
        //                 console.log(ele);
        //                 if (ele.userId == req.user.id) {
        //                     console.log(ele);
        //                     obj = ele
        //                 }
        //             })
        //         }
        //     })
        res.status(200).json({ data: rating_db })
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

exports.getAllRating = async (req, res) => {
    try {
        const rating_db = await Product.findOne({ _id: req.params.id })
        res.status(200).json({ data: rating_db.ratings })
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

exports.userChangePassword = async (req, res) => {
    try {
        const { password, newPassword } = req.body;
        const _id = req.user.id
        const user_db = await User.findOne({ _id });
        if (user_db) {
            const isMatch = await bcrypt.compareSync(password, user_db.password);
            if (!isMatch) return res.status(400).json({ msg: "Mật khẩu không chính xác!", type: "password" });
            if (password == newPassword)
                return res.status(400).json({ msg: "Mật khẩu mới không được trùng với mật khẩu cũ!", type: "newPassword" })
            const passHash = await bcrypt.hash(newPassword, 10);
            const userUpdate = await User.findOneAndUpdate({ _id }, { password: passHash }
                , { new: true }
            )
            res.status(200).json({ msg: "Đổi mật khẩu thành công!" })
        }
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}