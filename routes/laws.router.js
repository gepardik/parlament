const { Router } = require('express')
const Law = require('../models/Law')
const auth = require('../middleware/auth.middleware')
const router = Router()

//  /api/law/current
router.get('/current', async (req, res) => {
    try {
        const laws = await Law.find({ current: true }).lean()
        res.json(laws)
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong. Try again!' })
    }
})

//  /api/law/past
router.get('/past', async (req, res) => {
    try {
        const laws = await Law.find({ current: false }).lean()
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
router.post('/vote', async (req, res) => {
    try {
        const law = await Law.findOne({ _id: req.body._id })

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