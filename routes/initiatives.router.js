const { Router } = require('express')
const config = require('config')
const Initiative = require('../models/Initiative')

const router = Router()

//  /api/initiative/initiatives
router.get('/initiatives', async (req, res) => {
    try {
        const initiatives = await Initiative.find({}).lean()
        res.json(initiatives)
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong. Try again!' })
    }
})

// /api/initiative/create    POST
router.post('/create', async (req, res) => {
    try {
        const initiative = new Initiative({
            title: req.body.title,
            content: req.body.content
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

//   /api/initiative/vote/:id
router.put('/vote/:id', async (req, res) => {
    try {
        await Initiative.findOneAndUpdate({ _id: req.params.id }, { counter: req.body.score }, {new: true})

    } catch (e) {
        res.status(500).json({ message: 'Something went wrong. Try again!' })
    }
})

module.exports = router