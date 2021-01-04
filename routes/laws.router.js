const { Router } = require('express')
const Law = require('../models/Law')
const User = require('../models/User')
const auth = require('../middleware/auth.middleware')
const router = Router()

//  /api/law/type/country/local
router.get('/:type/:country', async (req, res) => {
    const current = req.params.type === 'current' ? true : false
    try {
        const laws = await Law.find({ current: current, country: req.params.country }).lean()
        res.json(laws)
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong. Try again!' })
    }
})

//  /api/law/type/country/local
router.get('/:type/:country/:local', async (req, res) => {
    const current = req.params.type === 'current' ? true : false
    try {
        const laws = await Law.find({ current: current, country: req.params.country, local: req.params.local }).lean()
        res.json(laws)
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong. Try again!' })
    }
})

// /api/law/create    POST
router.post('/create', auth, async (req, res) => {
    try {
        const law = new Law({
            title: req.body.title,
            content: req.body.content,
            author: req.user.userId,
            country: req.body.country,
            local: req.body.local,
            video: req.body.video
        })

        await law.save()
        res.status(201).json({ law })
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong. Try again!' })
    }
})

//  /api/law/:id
router.get('/:id', async (req, res) => {
    try {
        const law = await Law.findById(req.params.id)
        res.json(law)
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong. Try again!' })
    }
})

//   /api/law/vote
router.post('/vote', auth, async (req, res) => {
    try {
        const law = await Law.findOne({ _id: req.body._id })
        const user = await User.findOne({ _id: req.user.userId })

        if (user.country !== law.country) {
            return res.status(400).json({message: 'You can vote only for the laws of your country!'})
        }

        if (law.local && law.local !== user.local) {
            return res.status(400).json({message: 'You can vote only for the laws of your country and local!'})
        }

        if (law.vote_for.find(voter => String(voter) === req.body.voter)
            || law.vote_against.find(voter => String(voter) === req.body.voter)) {
            return res.status(400).json({message: 'You can vote only once for a certain law!'})
        }

        if (req.body.vote > 0) {
            law.vote_for.push(req.body.voter)
        } else if (req.body.vote < 0) {
            law.vote_against.push(req.body.voter)
        }

        await law.save()

        res.status(201).json({ message: 'Thank you! Your vote is saved.'})

    } catch (e) {
        res.status(500).json({ message: 'Something went wrong. Try again!' })
    }
})

module.exports = router