const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        default: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    author: {
        type: Types.ObjectId,
        ref: 'User',
        default: null
    },
    current: {
        type: Boolean,
        default: true
    },
    vote_for:
        [{
            type: Types.ObjectId,
            ref: 'User'
        }],
    vote_against:
        [{
            type: Types.ObjectId,
            ref: 'User'
        }],
    country: {
        type: String,
        required: true
    }
    ,
    local: {
        type: String
    },
    video: {
    type: [String]
    }
})

module.exports = model('Law', schema)