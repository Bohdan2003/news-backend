const { Router } = require('express')
const Regions = require('../models/regions')
const router = Router()

router.get('/', async (req, res) => {
    const regions = await Regions.find()
    // setTimeout(() => {
    //     res.json(regions)
    // }, 5000)
    res.json(regions)
})

router.post('/', async(req, res) => {
    const regions = new Regions({
        title: req.body.title,
        articles: []
    })

    try {
        await regions.save()
        res.json(regions)
    } catch (e) {
        console.log(e)
    }
})

router.post('/:id/articles', async(req, res) => {
    const regions = await Regions.findById(req.params.id)
    await regions.addArticles({
        descr: req.body.descr,
        date: req.body.date
    })

    try {
        res.json(regions)
    } catch (e) {
        console.log(e)
    }
})

router.post('/:id/articles/remove', async(req, res) => {
    const regions = await Regions.findById(req.params.id)
    await regions.deleteArticle(req.body.id)

    try {
        res.json(regions)
    } catch (e) {
        console.log(e)
    }
})

module.exports = router