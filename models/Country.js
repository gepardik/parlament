const { Schema, model } = require('mongoose')

const schema = new Schema({
    code: [{
        type: String,
        required: true
    }]
})

module.exports = model('Country', schema)