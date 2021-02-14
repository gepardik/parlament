const {Router} = require('express')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const config = require('config')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')
const router = Router()
const nodemailer = require('nodemailer')

//  /api/auth
router.post(
    '/register',
    [
        check('username', 'Enter username').exists(),
        check('first_name', 'Enter First Name').exists(),
        check('last_name', 'Enter Last Name').exists(),
        check('email', 'Incorrect e-mail address').normalizeEmail().isEmail(),
        check('password', 'Minimum password length 6 symbols')
            .isLength({ min:6 }),
        check('country', 'Country field must not be empty!').exists(),
        check('local', 'Local field must not be empty!').exists()

    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Incorrect registration data'
                })
            }

            const {username, first_name, last_name, email, password, country, local} = req.body

            const candidate = await User.findOne({ username })

            if (candidate) {
                return res.status(400).json({ message: 'This username already exists!' })
            }

            const hashedPassword = await bcrypt.hash(password, 12)

            const user = new User({
                username,
                first_name,
                last_name,
                email,
                country,
                local,
                password:hashedPassword
            })

            await user.save()

            res.status(201).json({message: 'User is created'})

        } catch (e) {
            res.status(500).json({message: 'Something went wrong! Try again!'})
        }
    }
)

//  /api/login
router.post(
    '/login',
    [
        check('username', 'enter correct username').exists(),
        check('password', 'enter password').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Incorrect login data'
                })
            }

            const {username, password} = req.body

            const user = await User.findOne({ username })

            if (!user) {
                return res.status(400).json({message: 'User not found!'})
            }

            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                return res.status(400).json({message: 'Wrong password! Try again!'})
            }

            const token = jwt.sign(
                { userId: user.id },
                config.get('jwtSecret'),
                { expiresIn: '1h' }
            )

            res.json({ token, userId: user.id, userName: user.username, role: user.role, userCountry: user.country, userLocal: user.local })

        } catch (e) {
            res.status(500).json({message: 'Something went wrong! Try again!'})
        }
})

//   /api/forgot-password
router.post('/forgot-password', (req, res) => {
    crypto.randomBytes(32, async (err, buffer) => {
        if (err) {
            console.log(err)
        }
        const token = buffer.toString("hex")
        await User.findOne({email: req.body.email}).then(user => {
            if (!user) {
                return res.status(422).json({message: 'Email not found!'})
            }
            user.resetToken = token
            user.expireToken = Date.now() + 3600000
            user.save().then( async (result) => {

// create reusable transporter object using the default SMTP transport
                let transporter = nodemailer.createTransport({
                    host: "smtp.hostinger.ru",
                    port: 587,
                    secure: false, // true for 465, false for other ports
                    auth: {
                        user: 'no-reply@kunstnik.com', // generated ethereal user
                        pass: 'Tvlkek123', // generated ethereal password
                    },
                });
                let info = await transporter.sendMail({
                    from: '"Peoples Vote" <no-reply@kunstnik.com>', // sender address
                    to: "t030626@gmail.com", // list of receivers
                    subject: "Hello", // Subject line
                    text: "Hello world?", // plain text body
                    html: "<b>Hello world?</b>", // html body
                });

                console.log("Message sent: %s", info.messageId);
                // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

                // Preview only available when sending through an Ethereal account
                //console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

                return res.status(201).json({message: 'Check your e-mail!'})
            })
        })
    })
})

module.exports = router
