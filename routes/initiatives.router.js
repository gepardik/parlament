const { Router } = require('express')
const Initiative = require('../models/Initiative')
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
router.get('/top/:country', async (req, res) => {
    try {
        const pipeline = [
            {
                '$project': {
                    'title': '$title',
                    'country': '$country',
                    'vote_for': '$vote_for',
                    'vote_against': '$vote_against',
                    'score': {
                        '$subtract': [
                            {
                                '$size': '$vote_for'
                            }, {
                                '$size': '$vote_against'
                            }
                        ]
                    }
                }
            }, {
                '$match': {
                    'country': req.params.country
                }
            }, {
                '$sort': {
                    'score': -1
                }
            }
        ]

        const initiatives = await Initiative.aggregate(pipeline)
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
            author: req.user.userId,
            country: req.body.country
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

        if (initiative.vote_for.find(voter => String(voter) === req.body.voter)
            || initiative.vote_against.find(voter => String(voter) === req.body.voter)) {
            return res.status(400).json({message: 'You can vote only once for a certain initiative!'})
        }

        if (req.body.vote > 0) {
            initiative.vote_for.push(req.body.voter)
        } else if (req.body.vote < 0) {
            initiative.vote_against.push(req.body.voter)
        }

        await initiative.save()

        res.status(201).json({ message: 'Thank you! Your vote is saved.'})

    } catch (e) {
        res.status(500).json({ message: 'Something went wrong. Try again!' })
    }
})

module.exports = router