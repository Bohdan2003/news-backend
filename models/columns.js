const { Schema, model } = require('mongoose');

const columns = new Schema({
    personName:{
        type:String,
        required: true
    },
    personVocation:{
        type:String,
        required: true
    },
    imgURL:{
        type:String,
        required: true
    },
    date:{
        type:String,
        required: true
    },
    descr:{
        type:String,
        required: true
    }
})  

module.exports = model('Columns', columns)