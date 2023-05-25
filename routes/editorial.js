const { Router } = require('express')
const Editorial = require('../models/editorial')
const upload = require('../middleware/file')
const router = Router()

router.get('/', async (req, res) => {
    const editorial = await Editorial.find()
    // setTimeout(() => {
    //     res.json(editorial)
    // }, 5000)
    res.json(editorial)
})

router.post('/', upload.single("file"), async (req, res) => {
    const editorial = new Editorial({
        imgURL: req.file.filename,
        descr: req.body.descr,
        date: req.body.date
    })

    try{
        await editorial.save()
        res.json(editorial)
    } catch (e){
        console.log(e)
    }
})

module.exports = router