const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

exports.requireLogin = (req, res, next) => {
    try {
        const token = req.header('Authorization');
        if (!token) return res.status(400).json({ msg: "Không có token!"});

        jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
            if(err) return res.status(400).json({ msg: "Yêu cầu xác thực!"});

            req.user = user;
            next();
        });
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
}

exports.requireUser = async (req, res, next) => {
    try {
        const user_db = await User.findOne({
            _id: req.user.id
        })
        if (user_db.role != 'user')
            return res.status(400).json({ msg: 'Bạn phải đăng nhập bằng tài khoản user!' });
            
        next();
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
}

exports.requireAdmin = async (req, res, next) => {
    try {
        const user_db = await User.findOne({
            _id: req.user.id
        })
        if (user_db.role != 'admin')
            return res.status(400).json({ msg: 'Bạn phải đăng nhập bằng tài khoản admin!' });
            
        next();
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
}
