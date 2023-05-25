const {Schema, model} = require('mongoose')

const all = Schema({
    type:{
        type: String,
        required: true
    },
    className: String,
    descr:{
        type: String,
        required: true
    },
    date:{
        type: String,
        required: true
    }
})  

module.exports = model("All", all)