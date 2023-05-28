const express = require('express');
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/images');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

router.post('/upload', upload.array('files'), (req, res) => {
    console.log(req.files);

    res.status(200).send(req.files.map((file, index) => ({
        filename: file.filename,
        originalname: file.originalname,
        fieldname: file.fieldname,
        encoding: file.encoding,
        mimetype: file.mimetype,
        size: file.size
    }))
    );
});

module.exports = router;
