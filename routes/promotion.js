const { Router } = require("express")
const Promotion = require('../models/promotion')
const upload = require('../middleware/file')
const router = Router()

router.get('/', async(req, res) => {
    const promotion = await Promotion.find()
    // setTimeout(() => {
    //     res.json(promotion)
    // }, 5000)
    res.json(promotion)  
})

router.post('/', upload.single("file"), async(req, res) => {
    const promotion = new Promotion({
        imgURL: req.file.filename,
        descr: req.body.descr,
        date: req.body.date,
        items:[]
    })    

    try{
        await promotion.save()
        res.json(promotion)
    } catch(e) {
        console.log(e)
    }
})

router.post('/:id/items', upload.single("file"), async(req, res) => {
    const promotion = await Promotion.findById(req.params.id)
    await promotion.addItem({
        descr: req.body.descr,
        date: req.body.date
    })   
    try{
        res.json(promotion)
    } catch(e) {
        console.log(e)
    }
})

module.exports = router