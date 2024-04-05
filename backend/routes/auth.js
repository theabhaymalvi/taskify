const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const {body, validationResult} = require("express-validator")
const router = express.Router();
const User = require("../models/User")
const dotenv = require('dotenv').config()
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

// 1. Register User
router.post("/register", [
    body('email', "Enter a valid email").isEmail(),
    body('password', "Password should be of minimum length 5").isLength({min: 5}),
    body('name', "Name should be of minimum length 3").isLength({min: 3}),
], async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) res.status(400).json({"error": errors.errors[0].msg});

    // checking existing user
    const user = await User.findOne({email: req.body.email});
    if(user) return res.status(400).json({error: "A user is already registered."});

    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(req.body.password, salt);

    const payload = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: encryptedPassword,
    });
    if(!payload) return res.status(400).json({error: "Some error occured while storing"});

    // creating authToken to verify user
    const authToken = jwt.sign(payload.toJSON(), JWT_SECRET_KEY);
    console.log(payload, authToken);
    return res.status(200).json({authToken: authToken});
}); 

// 2. Logging in User
router.post("/login", [
    body('email', "Enter a valid email").isEmail(),
    body('password', "Password should be of minimum length 5").isLength({min: 5}),
], async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({"error": errors.errors[0].msg});

    try {
        let result = await User.findOne({email: req.body.email});
        // no user with given email found
        if(!result) return res.status(400).json({error: "Please enter correct email address"});
        
        // password matching
        const passwordMatch = await bcrypt.compare(req.body.password, result.password);
        if(!passwordMatch) return res.status(400).json({error: "Please enter correct password"});
        console.log(result);

        // creating authToken
        const authToken = jwt.sign(result.toJSON(), JWT_SECRET_KEY);
        res.status(200).json({authToken: authToken});
    } catch (err) {
        res.status(500).json({error: "Internal Server Error"});
    }
});

module.exports = router;