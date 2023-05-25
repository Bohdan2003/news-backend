const { Schema, model } = require('mongoose')

const editorial = Schema({
    imgURL: {
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

module.exports = model('Editorial', editorial)