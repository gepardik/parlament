const { Router } = require('express')
const Law = require('../models/Law')
const Initiative = require('../models/Initiative')
const router = Router()


//  /api/search/:by/
router.get('/:by', async (req, res) => {
    try {
        let regex = new RegExp(req.params.by,'i');
        const pipeline = [
            {
                '$project': {
                    'title': '$title',
                    'country': '$country',
                    'local': '$local'
                }
            }, {
                '$match': {
                    'title': regex,
                }
            }
        ]

        const laws = await Law.aggregate(pipeline)
        const initiatives = await Initiative.aggregate(pipeline)
        res.json({laws, initiatives})

    } catch (e) {
        res.status(500).json({ message: 'Something went wrong. Try again!' })
    }
})

module.exports = router
