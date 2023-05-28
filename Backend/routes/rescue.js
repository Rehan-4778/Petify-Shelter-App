const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
var multer = require('multer');
var upload = multer();
const fetchshelter = require('../middleware/fetchshelter');


const Rescue = require('../models/Rescue');
const fetchuser = require('../middleware/fetchuser');

//ROUTE:1 Get All Rescue: GET "/api/rescue/fetchallrescue" .Login required
router.get('/fetchallrescue', fetchshelter, async (req, res) => {
    let success = false;
    try {
        // get all rescue cases
        const rescue = await Rescue.find({});
        success = true;
        res.json({ success, rescue });
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error');
    }
});
// ROUTE:2 Creating a rescue using: POST "/api/rescue/createrescue" . No login required
router.post(
    '/createrescue', fetchuser,
    [
        body('longitude', 'Enter valid location').notEmpty(),
        body('latitude', 'Enter valid location').notEmpty(),
        body('contactName', 'Enter a valid contactName').notEmpty(),
        body('contactNumber', 'Enter a valid contactNumber').notEmpty(),
    ],
    async (req, res) => {
        let success = false;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, errors: errors.array() });
        }

        const images = [];
        for (let i = 0; i < req.body.images.length; i++) {
            images.push(req.body.images[i]);
        }
        try {
            let rescue = await Rescue.create({
                status: "Pending",
                latitude: req.body.latitude,
                longitude: req.body.longitude,
                description: req.body.description,
                contactName: req.body.contactName,
                contactNumber: req.body.contactNumber,
                images: images,
                user: req.user.id,
            });
            success = true;
            res.json({ success, rescue });
        } catch (error) {
            console.log(error.message);
            res.status(500).send('Internal Server Error');
        }
    }
);


//ROUTE:3 Delete an Existing rescue : Delete "/api/rescue/deleterescue/:id" .Login required
router.delete('/deleterescue/:id', fetchshelter, async (req, res) => {
    try {
        let success = false;
        // Find the note to be delete and delete it
        let rescue = await Rescue.findById(req.params.id);
        if (!rescue) {
            return res.status(404).send('Not Found');
        }

        rescue = await Rescue.findByIdAndDelete(req.params.id);
        success = true;
        res.json({ success, rescue });
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error');
    }
});


//ROUTE:4 Update an the status of rescue case : PUT "/api/rescue/updaterescue/:id" .Login required
router.put('/updaterescue/:id', fetchshelter, async (req, res) => {

    try {
        let success = false;
        const { status } = req.body;
        const newRescue = {};
        if (status) {
            newRescue.status = status;
        }
        // Find the note to be update and update it
        let rescue = await Rescue.findById(req.params.id);
        if (!rescue) {
            return res.status(404).send('Not Found');
        }
        rescue = await Rescue.findByIdAndUpdate(req.params.id, { $set: newRescue }, { new: true });
        success = true;
        res.json({ success, rescue });
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error');
    }
});



module.exports = router;