const { Schema, model } = require("mongoose")

const regions = new Schema({
    title: {
        type: String,
        required: true
    },
    articles:[
        {
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

regions.methods.addArticles = function (article) {
    const articles = [...this.articles]
    articles.push(article)

    this.articles = articles

    return this.save()
}

regions.methods.deleteArticle = async function (id) {
    const articles = [...this.articles]
    const newArticles = articles.filter(a => a._id.toString() !== id.toString())

    this.articles = newArticles

    return this.save()
}

module.exports = model('Regions', regions)