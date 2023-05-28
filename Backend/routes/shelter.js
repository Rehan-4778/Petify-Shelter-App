const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

const User = require('../models/User');
const Shelter = require('../models/Shelter');

const fetchuser = require('../middleware/fetchuser');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const JWT_SECRET = 'petify';

//ROUTE:1 Get All Shelters: GET "/api/shelter/fetchallshelter" .Login required
router.get('/fetchallshelter', fetchuser, async (req, res) => {
    try {
        const shelter = await Shelter.find({});
        res.json(shelter);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error');
    }
});

// ROUTE:2 Creating a shelter using: POST "/api/shelter/createshelter"  
router.post(
    '/createshelter', fetchuser,
    [
        body('email', 'Enter a valid Email Address').isEmail(),
        body('location', 'Enter Invalid Location').contains(),
        body('name', 'Enter a valid Name').isLength({ min: 5 }),
        body('description', 'Enter a valid description').isLength({ min: 5 }),
        body('phone', 'Phone No Must be atleast 11 characters long').isLength({
            min: 11,
        }),
    ],
    async (req, res) => {
        let success = false;
        //If there are errors, return bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, errors: errors.array() });
        }
        //check wheather the user with this email exists already
        try {
            let shelter = await Shelter.findOne({ email: req.body.email });
            if (shelter) {
                success = false;
                return res.status(400).json({
                    success,
                    error: 'Sorry a shelter with this email already exists',
                });
            }

            shelter = await Shelter.create({
                name: req.body.name,
                location: req.body.location,
                description: req.body.description,
                phone: req.body.phone,
                email: req.body.email,
                user: req.user.id,
            });
            success = true;
            res.json({ success, shelter });
        } catch (error) {
            console.log(error.message);
            res.status(500).send('Internal Server Error');
        }
    }
);




//ROUTE:3 Delete an Existing shelter : Delete "/api/auth/deleteshelter/:id" .Login required
router.delete('/deleteshelter/:id', fetchuser, async (req, res) => {
    try {
        // Find the note to be delete and delete it
        let shelter = await Shelter.findById(req.params.id);
        if (!shelter) {
            return res.status(404).send('Not Found');
        }
        //Allow deletion only if the user owns this shelter
        if (shelter.user.toString() != req.user.id) {
            return res.status(401).send('Not Allowed');
        }

        shelter = await Shelter.findByIdAndDelete(req.params.id);
        res.json({ Success: 'Shelter has been deleted', shelter: shelter });
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error');
    }
});

//ROUTE:4 Update an Existing shelter : PUT "/api/auth/updateshelter/:id" .Login required
router.put('/updateshelter/:id', fetchuser, async (req, res) => {
    try {
        const { name, location, description, email, phone } = req.body;
        //create a newNote object
        const newShelter = {};
        if (name) {
            newShelter.name = name;
        }
        if (description) {
            newShelter.description = description;
        }
        if (location) {
            newShelter.location = location;
        }
        if (email) {
            try {
                let user = await User.findOne({ email: req.body.email });
                if (user) {
                    success = false;
                    return res.status(400).json({
                        success,
                        error: 'Sorry a user with this email already exists',
                    });
                }
            }
            catch (error) {
                console.log(error.message);
                res.status(500).send('Internal Server Error');
            }
            newShelter.email = email;
        }
        if (phone) {
            newShelter.phone = phone;
        }
        // Find the shelter to be updated and update it
        let shelter = await Shelter.findById(req.params.id);
        if (!shelter) {
            return res.status(404).send('Not Found');
        }

        if (shelter.user.toString() != req.user.id) {
            return res.status(401).send('Not Allowed');
        }

        shelter = await Shelter.findByIdAndUpdate(
            req.params.id,
            { $set: newShelter },
            { new: true }
        );
        res.json(shelter);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;