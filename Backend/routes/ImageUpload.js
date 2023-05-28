const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;

// Configuration 
cloudinary.config({
    cloud_name: "dmz7vjssf",
    api_key: "122931797476478",
    api_secret: "uZ3mKyRDmuj55Chq_RBmIzxkE-s"
});


// Create Multer storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/upload', upload.array('files'), async (req, res) => {
    try {
        const files = req.files; // Assuming files are sent in the request body or form-data field 'files'

        const uploadedImages = [];

        for (const file of files) {
            const base64File = file.buffer.toString('base64');
            const result = await cloudinary.uploader.upload(`data:${file.mimetype};base64,${base64File}`, {
                folder: 'uploads' // Specify the folder where you want to store the images
            });
            uploadedImages.push(result.secure_url);
        }

        res.status(200).json(uploadedImages);
    } catch (error) {
        console.error('Error uploading images:', error);
        res.status(500).send('Error uploading images');
    }
});

// Delete image
router.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await cloudinary.uploader.destroy(id);
        res.status(200).json(result);
    } catch (error) {
        console.error('Error deleting image:', error);
        res.status(500).send('Error deleting image');
    }
});

module.exports = router;
