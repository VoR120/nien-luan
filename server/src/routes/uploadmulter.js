const express = require('express');
const Router = express.Router();
const { requireLogin, requireAdmin } = require('../middleware/auth');
const { nanoid } = require('nanoid');

const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'nlcntt'
    }
})

const upload = multer({ storage: storage });

// Thư mục lưu ảnh
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'public/uploads');
//     },
//     filename: function (req, file, cb) {
//         cb(null, nanoid() + '-' + file.originalname);
//     }
// })
// const upload = multer({ storage })

Router.post('/uploadmulter', upload.array('file') ,async (req, res) => {
    try {
        console.log(req.files);
    } catch (error) {
        return res.status(500).json({ msg: error.message }) 
    }
})

// Router.post('/delete', requireLogin, requireAdmin, (req, res) => {
//     try {
//         const { public_id } = req.body;
//         if (!public_id) return res.status(400).json({ msg: 'No file selected' });
//         cloudinary.v2.uploader.destroy(public_id, async (error, result) => {
//             if (error) throw error;
//             res.json({ msg: 'Image deleted' })
//         })
//     } catch (error) {
//         return res.status(500).json({ msg: error.message })
//     }
// })

const removeTmp = (path) => {
    fs.unlink(path, err => {
        if (err) throw err;
    })
}

module.exports = Router;