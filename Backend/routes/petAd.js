const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

const PetAd = require("../models/PetAd");

const fetchuser = require('../middleware/fetchuser');


//ROUTE:1 Get All Post: GET "/api/petAd/fetchallads" .Login required
router.get('/fetchallads', fetchuser, async (req, res) => {
    try {
        const petAd = await PetAd.find({});
        res.json(petAd);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error');
    }
});
// ROUTE:2 Creating a post using: POST "/api/petAd/createpost" . login required
router.post(
    '/createad', fetchuser,
    [
        body('name', 'Enter a valid name').contains(),
        body('description', 'Enter a valid description').isLength({ min: 5 }),
        body('gender', 'Enter a valid gender').contains(),
        body('breed', 'Enter a valid breed').contains(),
        body('color', 'Enter a valid color').contains(),
        body('price', 'Enter a valid price').contains(),
        body('longitude', 'Enter a valid longitude').contains(),
        body('latitude', 'Enter a valid latitude').contains(),
        body('contactName', 'Enter a valid contactName').contains(),
        body('contactNumber', 'Enter a valid contactNumber').contains(),
    ],
    async (req, res) => {
        let success = false;
        //If there are errors, return bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, errors: errors.array() });
        }

        const images = [];
        for (let i = 0; i < req.body.images.length; i++) {
            images.push(req.body.images[i]);
        }

        //check wheather the user with this email exists already
        try {
            let petAd = await PetAd.create({
                name: req.body.name,
                description: req.body.description,
                gender: req.body.gender,
                breed: req.body.breed,
                color: req.body.color,
                price: req.body.price,
                images: images,
                contactName: req.body.contactName,
                contactNumber: req.body.contactNumber,
                longitude: req.body.longitude,
                latitude: req.body.latitude,
                status: "Pending",
                user: req.user.id
            });
            success = true;
            res.json({ success, petAd });
        } catch (error) {
            console.log(error.message);
            res.status(500).send('Internal Server Error');
        }
    }
);


//ROUTE:3 Delete an Existing post : Delete "/api/petAd/deletead/:id" .Login required
router.delete('/deletead/:id', fetchuser, async (req, res) => {
    try {
        // Find the note to be delete and delete it
        let petAd = await PetAd.findById(req.params.id);
        if (!petAd) {
            return res.status(404).send('Not Found');
        }
        //Allow deletion only if the user owns this shelter
        if (petAd.user.toString() != req.user.id) {
            return res.status(401).send('Not Allowed');
        }

        petAd = await PetAd.findByIdAndDelete(req.params.id);
        res.json({ Success: 'Rescue Case has been deleted', petAd: petAd });
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error');
    }
});


//ROUTE:4 Update an Existing post : PUT "api/petAd/updatepost/:id" .Login required
router.put('/updatead/:id', fetchuser, async (req, res) => {
    try {
        const { name, gender, breed, price, location, description, image, category, phone, status } = req.body;
        //create a newNote object
        const newPost = {};
        if (name) {
            newPost.name = name;
        }
        if (gender) {
            newPost.gender = gender;
        }
        if (phone) {
            newPost.phone = phone;
        }
        if (breed) {
            newPost.breed = breed;
        }
        if (price) {
            newPost.price = price;
        }
        if (image) {
            newPost.image = image;
        }
        if (status) {
            newPost.status = status;
        }
        if (description) {
            newPost.description = description;
        }
        if (location) {
            newPost.location = location;
        }

        if (color) {
            newPost.color = color;
        }

        // Find the shelter to be updated and update it
        let post = await PetAd.findById(req.params.id);
        if (!post) {
            return res.status(404).send('Not Found');
        }

        if (post.user.toString() != req.user.id) {
            return res.status(401).send('Not Allowed');
        }

        post = await PetAd.findByIdAndUpdate(
            req.params.id,
            { $set: newPost },
            { new: true }
        );
        res.json(post);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error');
    }


});



module.exports = router;