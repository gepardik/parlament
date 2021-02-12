const {Router} = require('express')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')
const router = Router()

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

module.exports = router
