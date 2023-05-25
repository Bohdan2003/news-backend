const { Router } = require('express')
const Columns = require('../models/columns')
const upload = require('../middleware/avatar')
const router = Router()

router.get('/', async(req, res) => {
    const columns = await Columns.find()
    // setTimeout(() => {
    //     res.json(columns)
    // }, 5000)
    res.json(columns)
})

router.post('/', upload.single("file"), async (req, res) => {
    const columns = new Columns({
        personName: req.body.personName,
        personVocation: req.body.personVocation,
        imgURL: req.file.filename,
        date: req.body.date,
        descr: req.body.descr
    })

    try{
        await columns.save()
        res.json(columns)
    } catch (e){
        console.log(e)
    }
})

module.exports = router