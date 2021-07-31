const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.userRegister = async (req, res) => {
    try {
        const user_db = await User.findOne({ email: req.body.email })
        if (user_db) return res.status(400).json({ msg: "Email đã tồn tại!" });

        const { fullName, email, address, phoneNumber, password, role } = req.body;
        const passHash = await bcrypt.hash(password, 10);
        const user = new User({ fullName, email, address, phoneNumber, password: passHash, role });
        await user.save((error, data) => {
            if (error) return res.json(error);
            if (data) {
                const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET, { expiresIn: '1d' })
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
        if (!user_db) return res.status(400).json({ msg: "Tài khoản không tồn tại!" });

        const isMatch = await bcrypt.compareSync(password, user_db.password);
        if (!isMatch) return res.status(400).json({ msg: "Mật khẩu không chính xác!" });

        const token = jwt.sign({ id: user_db._id }, process.env.TOKEN_SECRET, { expiresIn: '1d' })
        res.cookie('token', token);

        res.status(200).json({ msg: "Đã đăng nhập!", user: user_db, token: token });
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
}

exports.userLogout = async (req, res) => {
    try {
        res.clearCookie('token');
        return res.json("Đã đăng xuất!");
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
}

exports.userInfo = async (req, res) => {
    try {
        const user_db = await User.findById(req.user.id);
        if(!user_db) return res.status(400).json({ msg: "Người dùng không tồn tại!" });

        return res.json(user_db);
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
}