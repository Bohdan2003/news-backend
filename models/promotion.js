const { Schema, model } = require('mongoose')

const promotion = new Schema({
    imgURL:{
        type: String,
        required: true
    },
    date:{
        type: String,
        required: true
    },
    descr:{
        type: String,
        required: true
    },
    items:[{
        date:{
            type: String,
            required: true
        },
        descr:{
            type: String,
            required: true
        }
    }]
}) 

promotion.methods.addItem = function(item){
    const items = [...this.items]
    items.push(item)

    this.items = items

    return this.save()
}

module.exports = model('Promotion', promotion)