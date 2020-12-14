const { Router } = require('express')
const Country = require('../models/Country')
const auth = require('../middleware/auth.middleware')
const router = Router()

//  /api/countries
router.get('/', async (req, res) => {
    try {
        const countries = await Country.find({}).lean()
        res.json(countries)
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong. Try again!' })
    }
})

// /api/countries/save    POST
router.post('/save', auth, async (req, res) => {
    try {
        let country = await Country.findOne({})
        if (!country) {
            country = new Country({})
        }

        country.code = req.body.code

        await country.save()
        res.status(201).json({ message: 'The countries have been saved!' })
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong. Try again!' })
    }
})

module.exports = router