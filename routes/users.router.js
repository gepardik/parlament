const { Router } = require('express')
const User = require('../models/User')
const auth = require('../middleware/auth.middleware')
const router = Router()

//  /api/users
router.get('/', async (req, res) => {
    try {
        const users = await User.find({}).lean()
        res.json(users)
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong. Try again!' })
    }
})

//   /api/users/change
router.post('/change', auth, async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.body._id })
        const role = user.role
        user.role = role === 'admin' ? 'user' : 'admin'

        await user.save()

        res.status(201).json({ message: 'User role is changed.'})
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong. Try again!' })
    }
})

module.exports = router