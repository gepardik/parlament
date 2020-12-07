const { Router } = require('express')
const Initiative = require('../models/Initiative')
const auth = require('../middleware/auth.middleware')
const router = Router()

//  /api/initiative/my_initiatives
router.get('/my_initiatives', auth, async (req, res) => {
    try {
        const initiatives = await Initiative.find({ author: req.user.userId }).lean()
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
        const initiative = await Initiative.findOne({ _id: req.body.id })
        initiative.score = req.body.score

        await initiative.save()
        res.status(201).json({ initiative })

    } catch (e) {
        res.status(500).json({ message: 'Something went wrong. Try again!' })
    }
})

module.exports = router