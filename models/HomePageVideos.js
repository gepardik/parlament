const { Schema, model } = require('mongoose')

const schema = new Schema({
        video_current: {
            type: [String]
        },
        video_past: {
            type: [String]
        },
        video_initiative: {
            type: [String]
        },
        country: {
            type: String,
            required: true
        },
        local: {
            type: String
        }
    }
)

module.exports = model('HomePageVideos', schema)
