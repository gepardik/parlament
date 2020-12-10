const { Router } = require('express')
const Initiative = require('../models/Initiative')
const User = require('../models/User')
const auth = require('../middleware/auth.middleware')
const router = Router()

//  /api/initiative/my
router.get('/my', auth, async (req, res) => {
    try {
        const initiatives = await Initiative.find({ author: req.user.userId }).lean()
        res.json(initiatives)
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong. Try again!' })
    }
})

//  /api/initiative/top
router.get('/top', async (req, res) => {
    try {
        const initiatives = await Initiative.find({  }).lean().sort({'score': -1})
        res.json(initiatives)
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong. Try again!' })
    }
})

// /api/initiative/create    POST
router.post('/create', auth, async (req, res) => {
    try {
        const initiative = new Initiative({
            title: req.body.title,
            content: req.body.content,
            author: req.user.userId
        })

        await initiative.save()
        res.status(201).json({ initiative })
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong. Try again!' })
    }
})

//  /api/initiative/:id
router.get('/:id', async (req, res) => {
    try {
        const initiative = await Initiative.findById(req.params.id)
        res.json(initiative)
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong. Try again!' })
    }
})

//   /api/initiative/vote
router.post('/vote', async (req, res) => {
    try {
        const initiative = await Initiative.findOne({ _id: req.body._id })
        if (req.body.new_vote === String(req.body.author)) {
            return res.status(400).json({message: 'You can not vote for your initiative!'})
        }

        if (initiative.voted_by.find(voter => String(voter) === req.body.new_vote)) {
            return res.status(400).json({message: 'You can vote only once for a certain initiative!'})
        }

        initiative.score = req.body.score
        initiative.voted_by.push(req.body.new_vote)

        await initiative.save()

        res.status(201).json({ initiative })

    } catch (e) {
        res.status(500).json({ message: 'Something went wrong. Try again!' })
    }
})

module.exports = router