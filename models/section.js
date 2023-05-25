const { Schema, model } = require("mongoose");

const section = new Schema({
    title:{
        type: String,
        required: true
    },
    newsTile:[
        {
            imgURL:{
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
        }
    ],
    newsList:[
        {
            className: String,
            descr:{
                type: String,
                required: true
            },
            date:{
                type: String,
                required: true
            }
        }
    ]
})

section.methods.addNewsTile = function(news){
    const cloneNewsTile = [...this.newsTile]
    cloneNewsTile.push(news)  

    this.newsTile = cloneNewsTile
    
    return this.save()
}

section.methods.addNewsList = function(news){
    const cloneNewsList = [...this.newsList]
    cloneNewsList.push(news)  

    this.newsList = cloneNewsList
    
    return this.save()
}

module.exports = model("Section", section)