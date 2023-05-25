const { Schema, model } = require('mongoose')

const video = Schema({
    imgURL: {
        type: String,
        required: true
    },
    videoLink: {
        type: String,
        required: true
    },
    descr:{
        type: String,
        required: true
    },
    date:{
        type: String,
        required: true
    }
})

module.exports = model('Video', video)