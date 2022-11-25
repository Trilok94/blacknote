const express = require('express')
const router = express.Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchUserIdFromJWT = require('../middleware/fetchUserIdFromJWT')
var success = false
router.post('/signup',
    // validate data during getting request
    [
        body('name', "enter a valid name, name should be min 5 characters").isLength({ min: 5 }),
        body('email', "enter a valid email").isEmail(),
        body('password', "password should be min 5 character").isLength({ min: 5 })
    ]
    , async (req, res) => {
        try {
            console.log(req.body)
            // if there are errors , return the bad request and errors during starting 
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                success = false
                return res.status(400).json({ success, errors: errors.array() });
            }

            // if there are errors , return the bad request and errors during making database entry
            let user = await User.findOne({ email: req.body.email })

            if (user) {
                success = false
                return res.status(400).json({ success, error: "sorry user already exist with this email!" })
            }
            else {
                // making salt 
                const salt = await bycrypt.genSalt(10);
                const norpass = req.body.password;

                const hashpass = await bycrypt.hash(norpass, salt)

                let user = await User.create({
                    email: req.body.email,
                    name: req.body.name,
                    password: hashpass,
                    // password: req.body.password,
                })

                // after creating user we will send a jwt token or session token to user 
                const jwt_sign_key = "hello jwt"
                const data = {
                    user: {
                        id: user.id
                    }
                }
                // console.log(`your data for jwt is : ${data}`)
                // console.log(`your user id is : ${user.id}`)
                // console.log(`your simplified data for jwt is : ${data.user.id}`)
                let token = jwt.sign(data, jwt_sign_key);
                success = true
                return res.json({ success, token }) // 632b2808bf103659ed1a6aa8  iat : 1663772913
            }
        } catch (error) {
            console.log(error.message)
            success = false
            return res.status(500).json({ success, error: 'Internal server Error!' })

        }
        // .then(user => res.json(user))
        //     .catch((error) => {
        //         console.log(error)
        //         res.json({ error: "sorry! this email is already registered with us. please enter different one" })
        //     });

    },

    // const user = User(req.body)
    // user.save()
)
router.post('/login',
    [
        body('email', "enter a valid email").isEmail(),
        body('password', "password is required").exists()
    ], async (req, res) => {
        try {
            console.log(req.body)
            // if there are errors , return the bad request and errors during starting 
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                success = false
                console.log('login done')
                return res.status(400).json({ success, errors: errors.array() });
            }

            const { email, password } = req.body;
            try {
                const user = await User.findOne({ email: email }) // findOne user whose email is this , whole user entry will get
                if (!user) {
                    success = false
                    console.log('login done')
                    return res.status(400).json({ success, error: "please try to login with correct credentials" })
                } else {
                    const pss_chk = await bycrypt.compare(password, user.password)
                    if (!pss_chk) {
                        success = false
                        console.log('login done')
                        return res.status(400).json({ success, error: "please try to login with correct credentials" })
                    } else {
                        const data = {
                            user: {
                                id: user.id
                            }
                        }
                        // console.log(`your data for jwt is : ${data}`)
                        // console.log(`your user id is : ${user.id}`)
                        // console.log(`your simplified data for jwt is : ${data.user.id}`)
                        const jwt_sign_key = "hello jwt"
                        let token = jwt.sign(data, jwt_sign_key);
                        success = true
                        console.log('login done')
                        return res.json({ success, token }) // 632b2808bf103659ed1a6aa8  iat : 1663772680
                    }
                }

            } catch (error) {
                success = false
                res.status(500).json({ success, error: "Internal Server problem!" })
                console.log(error.message)
            }
        } catch (error) {
            success = false
            res.status(500).json({ success, error: 'Internal Server problem!' })
            console.log(error.message)
        }

    })

// both route are giving me jwt token now with auth token we can get user details 
router.get('/getuserdetails', fetchUserIdFromJWT, async (req, res) => {
    try {
        const userid = req.user.id;
        // console.log(`this is the user id : ${userid}`)
        const user_details = await User.findById(userid)
        // console.log(`this is user details : ${user_details}`)
        success = true
        res.json({ success, user_details })
    } catch (error) {
        success = false
        res.status(500).json({ success, error: 'Internal Server problem!' })
        console.log(error.message)
    }
})
module.exports = router;