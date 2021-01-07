const { Schema, model } = require('mongoose')

const schema = new Schema({
        place: {
            type: Number,
            required: true,
            enum: [1, 2, 3]  // 1-current laws |  2-past laws | 3-top initiatives
        },
        videos: {
            type: [String]
        }
    }
)

module.exports = model('HomePageVideos', schema)
