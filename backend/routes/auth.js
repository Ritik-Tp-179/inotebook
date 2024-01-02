const express = require("express")
const router = express.Router()
const User = require("../models/User")
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken');
const fetchuser = require("../middleware/fetchuser");
const JWT_SECRET = "RitikIsGoodBoy"

// Route 1: Create a user using "/api/aut/createuser".
router.post("/createuser", [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleast 8 chracter").isLength({ min: 8 })
], async (req, res) => {
    let success = false
    // console.log(req.body)
    // const user = User(req.body)
    // user.save()
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() })
    }

    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ success, error: "Sorry user with this email already exist.." })
        }
        const salt = await bcrypt.genSalt(10)
        const secPass = await bcrypt.hash(req.body.password, salt)
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        })
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET)
        // console.log(authToken)
        success = true
        res.json({success, authToken})
        // res.json(user)

    } catch (error) {
        console.log(error)
        res.status(500).send("Error somthing")
    }
    // .then(user=>res.json(user))
    // .catch(err=>{console.log(err)
    //     res.json({error:"Enter unique email", message:err.message})
    // })
})

// Route 2: Authenicate a user using "/api/aut/login".
let success = false
router.post("/login", [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleast 8 chracter").exists()
], async (req, res) => {
    let success = false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    console.log("////////////////////////////////")
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ success, error: "Enter correct cridentials" })
        }
        const comparePassword = await bcrypt.compare(password, user.password)
        if (!comparePassword) {
            return res.status(400).json({success, error: "Enter correct cridentials" })
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET)
        // console.log(authToken)
        success=true
        res.json({success,authToken})
    } catch (error) {
        console.log(error)
        res.status(500).send("Error somthing")
    }
})

// Route 2: Authrnicate a user using "/api/aut/getuser". Login required
router.post("/getuser",fetchuser, async (req, res) => {
    try {
        let userid = req.user.id;
        const user = await User.findById(userid).select("-password")
        res.send(user)
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Error somthing")
    }
})

module.exports = router
