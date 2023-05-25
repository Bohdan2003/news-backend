const { Router } = require('express')
const Video = require('../models/video')
const upload = require('../middleware/file')
const router = Router()

router.get('/:limit', async(req, res) => {
    const video = await Video.find()
    // setTimeout(() => {
    //     res.json({
    //         news: video.slice(0, req.params.limit),
    //         length: video.length
    //     })
    // }, 5000)
    res.json({
        news: video.slice(0, req.params.limit),
        length: video.length
    })
})

router.post('/', upload.single("file"), async(req, res) => {
    const video = new Video({
        imgURL: req.file.filename,
        videoLink: req.body.videoLink,
        descr: req.body.descr,
        date: req.body.date
    })

    try{
        await video.save()
        res.json(video)
    } catch (e) {
        console.log(e)
    }
    
})

module.exports = router