const { Schema, model } = require('mongoose')

const slider = new Schema({
    imgURL: {
        type: String,
        required: true
    },
    descr: {
        type: String,
        required: true
    }
})

module.exports = model('Slider', slider)