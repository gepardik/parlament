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
router.post(
    '/forgot-password',
    [ check('email', 'Incorrect e-mail address').normalizeEmail().isEmail() ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(200).json({
                    errors: errors.array(),
                    message: 'Incorrect email'
                })
            }

            crypto.randomBytes(32, async (err, buffer) => {
                if (err) {
                    console.log(err)
                }
                const token = buffer.toString("hex")
                const {email} = req.body


                const user = await User.findOne({ email })
                if (!user) {
                    return res.status(200).json({message: 'Email not found!'})
                }
                user.resetToken = token
                user.expireToken = Date.now() + 3600000
                user.save()

                const transporter = nodemailer.createTransport({
                    host: 'smtp.hostinger.ru',
                    port: 587,
                    auth: {
                        user: 'no-reply@kunstnik.com',
                        pass: 'Tvlkek123'
                    }
                })

                let message = {
                    from: "People's Vote <no-reply@kunstnik.com>",
                    to: `${user.first_name} ${user.last_name} <${user.email}>`,
                    subject: "Password reset",
                    text: `Hello dear ${user.first_name} ${user.last_name}.
                   Here is the link for resetting the password for user ${user.username}: 
                   http://sambala.ee/password-reset/${user.resetToken}
                   The link is available during 1 hour after receiving this e-mail.
                   Ignore this letter if you didn't request for password reset.
                   Best regards,
                   People's Vote Team
            `,
                    html: `<p><b>Hello dear ${user.first_name} ${user.last_name}</b>.</p>
                    <p> Here is the link for resetting the password for user <b>${user.username}</b>:</p>
                    <p><a href="http://sambala.ee/password-reset/${user.resetToken}">Password reset link</a></p>
                    <p>The link is available during 1 hour after receiving this e-mail.</p>
                    <p>Ignore this letter if you didn't request for password reset.</p>
                    <br />
                    <p>Best regards,
                    <br />
                    People's Vote Team
                    </p>
            `
                }

                await transporter.sendMail(message, (err) => {
                    if (err) {
                        res.status(500).json({message: 'Error!'})
                    }
                })

                res.status(201).json({message: 'Check your e-mail!'})

            })
        } catch (e) {
            res.status(500).json({message: 'Something went wrong! Try again!'})
        }
})

//   /api/reset-password
router.post('/reset-password',  async(req, res) => {
    try {
        const resetToken = req.body.token
        const hashedPassword = await bcrypt.hash(req.body.password, 12)
        const user = await User.findOne({resetToken})

        if (!user) {
            return res.status(200).json({message: 'Wrong token! Try again!'})
        }
        const expireToken = new Date(user.expireToken)
        const now = new Date()
        if (now > expireToken) {
            return res.status(200).json({ result: 'error', message: 'The password reset token is expired! Try again!' })
        }

        user.password = hashedPassword
        user.resetToken = ''
        user.expireToken = ''
        user.save()
        return res.status(201).json({ result: 'success', message: `Password is reset for user ${user.username}! You will be redirected to login page in 3 seconds!`})

    } catch (e) {
        return res.status(500).json({message: 'Something went wrong! Try again!'})
    }
})

module.exports = router
