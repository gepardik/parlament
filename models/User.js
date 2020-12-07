const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    username: {type: String, required: true, unique: true},
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    initiatives: [{ type: Types.ObjectId, ref: 'Initiative' }]
})

module.exports = model('User', schema)