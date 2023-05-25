const { Router } = require("express")
const All = require('../models/all')
const router = Router()

router.get('/:limit', async(req, res) => {
    const all = await All.find()
    // setTimeout(() => {
    //     res.json({
    //         news: all.slice(0, req.params.limit),
    //         length: all.length
    //     })
    // }, 3000)
    res.json({
        news: all.slice(0, req.params.limit),
        length: all.length
    })
})

router.post('/', async(req, res) => {
    const all = new All({
        type: req.body.type,
        className: req.body.className,
        descr: req.body.descr,
        date: req.body.date
    })

    try{
        await all.save()
        res.json(all)
    } catch (e) {
        console.log(e)
    }  
})

module.exports = router