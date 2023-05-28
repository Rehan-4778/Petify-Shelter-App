const express = require('express');
const Shelter = require('../models/Shelter');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const fetchshelter = require('../middleware/fetchshelter');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const JWT_SECRET = 'petify';

// ROUTE:1 Creating a Shelter using: POST "/api/shelterAuth/createshelter" . No login required
router.post(
    '/createshelter',
    [
        body('email', 'Enter a valid Email Address').isEmail(),
        body('name', 'Enter a valid Name').isLength({ min: 5 }),
        body('password', 'Password Must be atleast 5 characters long').isLength({
            min: 5,
        }),
        body('longitude', 'Enter valid location').notEmpty(),
        body('latitude', 'Enter valid location').notEmpty(),
        body('phone', 'Enter a valid phone number').notEmpty(),
        body('description', 'Enter a valid description').notEmpty(),
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

            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.password, salt);

            const images = [];
            for (let i = 0; i < req.body.images.length; i++) {
                images.push(req.body.images[i]);
            }

            shelter = await Shelter.create({
                status: "Pending",
                name: req.body.name,
                password: secPass,
                email: req.body.email,
                longitude: req.body.longitude,
                latitude: req.body.latitude,
                phone: req.body.phone,
                description: req.body.description,
                website: req.body.website,
                images: images,
            });

            success = true;
            const data = {
                shelter: {
                    id: shelter.id,
                },
            };
            const authtoken = jwt.sign(data, JWT_SECRET);
            res.json({ success, authtoken });
        } catch (error) {
            console.log(error.message);
            res.status(500).send('Internal Server Error');
        }
    }
);

// ROUTE:2 Authenticate a Shelter using: POST "/api/shelterAuth/login" .
router.post(
    '/login',
    [
        body('email', 'Enter a valid Email Address').isEmail(),
        body('password', 'Password cannot be blank').exists(),
    ],
    async (req, res) => {
        let success = false;
        //If there are errors, return bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, errors: errors.array() });
        }
        const { email, password } = req.body;
        try {
            let shelter = await Shelter.findOne({ email });

            if (shelter.status === "Pending") {
                success = false;
                return res.status(400).json({
                    success,
                    error: 'Your account is not verified yet',
                });
            }

            if (!shelter) {
                success = false;
                return res.status(400).json({
                    success,
                    error: 'Please try to login with correct credentials',
                });
            }
            const passwordCompare = await bcrypt.compare(password, shelter.password);
            if (!passwordCompare) {
                success = false;
                return res.status(400).json({
                    success,
                    error: 'Please try to login with correct credentials',
                });
            }
            success = true;
            const data = {
                shelter: {
                    id: shelter.id,
                },
            };
            const authtoken = jwt.sign(data, JWT_SECRET);
            res.json({ success, authtoken });
        } catch (error) {
            console.log(error.message);
            res.status(500).send('Internal Server Error');
        }
    }
);

//ROUTE:3 Get User Login Details: POST "/api/auth/getuser" .Login required
router.get('/getshelter', fetchshelter, async (req, res) => {
    try {
        const shelterId = req.shelter.id;
        const shelter = await Shelter.findById(shelterId).select("-password");
        res.send(shelter);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error');
    }
});

// Route:4 Get Shelters Detail 
router.get('/shelters', async (req, res) => {
    try {
        const shelters = await Shelter.find({}).select("-password");
        res.send(shelters);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error');
    }
});



// Route:4 Check if shelter already exists: POST "/api/shelterAuth/checkshelter" . No login required
router.post(
    '/checkshelter',
    [
        body('email', 'Enter a valid Email Address').isEmail(),
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
            const shelter = await Shelter.findOne({ email: req.body.email });
            if (shelter) {
                success = false;
                return res.status(400).json({
                    success,
                    error: 'Sorry a shelter with this email already exists',
                });
            }
            success = true;
            res.json({ success });
        } catch (error) {
            console.log(error.message);
            res.status(500).send('Internal Server Error');
        }
    }
);

// Route:5 Update Shelter status: POST "/api/shelterAuth/updateshelter"
router.put(
    '/updateshelter/:id',
    async (req, res) => {
        let success = false;
        //If there are errors, return bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, errors: errors.array() });
        }
        try {
            const shelter = await Shelter.findById(req.params.id);

            if (!shelter) {
                success = false;
                return res.status(400).json({
                    success,
                    error: 'Shelter not found',
                });
            }

            shelter.status = "Verified";
            await shelter.save();
            success = true;
            res.json({ success });
        } catch (error) {
            console.log(error.message);
            res.status(500).send('Internal Server Error');
        }
    }
);


// Route 6: Delete Shelter: DELETE "/api/shelterAuth/deleteshelter/:id" .Login not required
router.delete('/deleteshelter/:id', async (req, res) => {
    try {
        // Find the note to be delete and delete it

        let shelter = await Shelter.findById(req.params.id);
        if (!shelter) {
            return res.status(404).send("Not Found");
        }
        shelter = await Shelter.findByIdAndDelete(req.params.id);
        res.json({ "Success": "Shelter has been deleted", shelter: shelter });
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error');
    }
});





module.exports = router;



