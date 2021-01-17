const { Router } = require('express')
const auth = require('../middleware/auth.middleware')
const Video = require('../models/HomePageVideos')
const router = Router()

// /api/video/create    POST
router.post('/create', auth, async (req, res) => {
    try {
        const {country, local, video_current, video_past, video_initiative} = req.body

        const candidate = await Video.findOne({ country, local })

        if (candidate) {
            return res.status(400).json({ message: 'You have already added videos for this country and local!' })
        }

        const videos = new Video({
            country,
            local,
            video_current,
            video_past,
            video_initiative,
        })

        await videos.save()
        return res.status(201).json({message: 'Videos are saved!'})
    } catch (e) {
        return res.status(500).json({ message: 'Something went wrong. Try again!' })
    }
})

//  /api/video/country/local
router.get('/:country', async (req, res) => {
    try {
        const video = await Video.findOne({ country: req.params.country })
        res.json(video)
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong. Try again!' })
    }
})

//  /api/video/country/local
router.get('/:country/:local', async (req, res) => {
    try {
        const video = await Video.findOne({ country: req.params.country, local: req.params.local })
        res.json(video)
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong. Try again!' })
    }
})


module.exports = router
