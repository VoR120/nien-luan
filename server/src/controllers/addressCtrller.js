const UserAddress = require('../models/addressModel');

exports.addAddress = async (req, res) => {
    try {
        const { payload } = req.body;
        if (payload.address) {
            const address_db = await UserAddress.findOneAndUpdate({ user: req.user.id }, {
                '$push': {
                    "address": payload.address
                }
            }, { new: true, upsert: true })
            if (address_db)
                return res.status(201).json({ address: address_db })
        }
    } catch (error) {
        return res.status(400).json({ msg: error.message })
    }
}

exports.getAddress = async (req, res) => {
    try {
        const address_db = await UserAddress.findOne({ user: req.user.id })
        if (address_db) {
            return res.status(200).json({ address: address_db })
        }
    } catch (error) {
        return res.status(400).json({ msg: error.message })
    }
}