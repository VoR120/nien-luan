const express = require('express');
const Router = express.Router();
const { requireLogin, requireAdmin } = require('../middleware/auth');
const cloudinary = require('cloudinary');
const cloudUploader = require('../configs/upload');

Router.post('/upload', requireLogin, requireAdmin, cloudUploader.array('file'), (req, res) => {
    try {
        if (req.files.length === 0)
            return res.status(400).json({ msg: 'No file uploaded' });

        let fileArray = [];
        for (let file of req.files) {
            if (file.size > 1024 * 1024) {
                return res.status(400).json({ msg: 'Size to large' })
            }
            if (file.mimetype != 'image/jpeg' && file.mimetype != 'image/png') {
                return res.status(400).json({ msg: 'File format is incorrect' })
            }

            fileArray.push({ public_id: file.filename, url: file.path });
        }

        res.status(200).json({ file: fileArray });

    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
})

Router.post('/delete', requireLogin, requireAdmin, (req, res) => {
    try {
        const { public_id } = req.body;
        if (public_id.length === 0) return res.status(400).json({ msg: 'No file selected' });
        for (let id of public_id) {
            cloudinary.v2.uploader.destroy(id, async (error, result) => {
                if (error) throw error;
            })
        }
        res.json({ msg: 'Image deleted' })
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
})


module.exports = Router;