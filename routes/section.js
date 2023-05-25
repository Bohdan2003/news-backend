const { Router } = require('express')
const Section = require('../models/section')
const upload = require('../middleware/file')
const router = Router()

router.get('/:id', async(req, res) => {
    const section = await Section.findById(req.params.id)
    // setTimeout(() => {
    //     res.json(section)
    // }, 5000)
    res.json(section)
})

router.post('/', async(req, res) => {
    const section = new Section({
        title: req.body.title,
        newsTile:[],
        newsList:[]
    })    

    try{
        await section.save()
        res.json(section)
    } catch(e) {
        console.log(e)
    }
})

router.post('/:id/tile', upload.single("file"), async(req, res) => {
    const section = await Section.findById(req.params.id)
    await section.addNewsTile({
        imgURL: req.file.filename,
        descr: req.body.descr,
        date: req.body.date
    })    

    try{
        res.json(section)
    } catch(e) {
        console.log(e)
    }
})

router.post('/:id/list', async(req, res) => {
    const section = await Section.findById(req.params.id)
    section.addNewsList({
        className: req.body.className,
        descr: req.body.descr,
        date: req.body.date
    })    

    try{
        res.json(section)
    } catch(e) {
        console.log(e)
    }
})


module.exports = router