const User = require('../models/userModel');

exports.getCustomer = async (req, res) => {
    try {
        const user_db = await User.find({ role: "user" }).sort({ createdAt: -1 });
        return res.json(user_db);
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
}