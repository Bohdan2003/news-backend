const { Router } = require('express')
const Slider = require('../models/slider')
const fs = require('fs')
const upload = require('../middleware/file')
const path = require('path')

const router = Router()

const deleteImage = async (filename) => {
    fs.unlink(path.join(__dirname, "../static/images", filename), (err) => {
        err 
            ? console.log(err) 
            : console.log(`Deleted file: ${filename}`)
    })
}

// export const usePaginatedTablePayload = () => {
//     const [payload, setPayload] = useState({
//         age: 1,
//     });
  
//     return {
//         setPayload,
//         payload,
//     };
// };

router.get('/', async (req, res) => {
    const slider = await Slider.find()
    // setTimeout(() => {
    //     res.json(slider)
    // }, 5000)
    res.json(slider)
    
})

router.post('/', upload.single("file"), async (req, res) => {
    const slider = new Slider({
        imgURL: req.file.filename,
        descr: req.body.descr
    })

    try{
        await slider.save()
        res.json(slider)
    } catch (e) {
        console.log(e)
    }  
})

router.post('/edit/:id', upload.single("file"), async (req, res) => {
    try{
       if(req.file){
            const oldSlide = await Slider.findById(req.params.id)
            // console.log(req.params.id)
            deleteImage(oldSlide.imgURL)
            await Slider.findByIdAndUpdate(req.params.id, {
                imgURL: req.file.filename,
                descr: req.body.descr
            })           
       } else {
            await Slider.findByIdAndUpdate(req.params.id, {descr: req.body.descr})
       }
        
        const slider = await Slider.find()
        res.json(slider)
    } catch (e) {
        console.log(e)
    }  
})

router.post('/remove', async (req, res) => {
    try{
        await Slider.deleteOne({_id: req.body._id})
        deleteImage(req.body.imgURL)
        const slider = await Slider.find()
        res.json(slider)
    } catch (e) {
        console.log(e)
    }  
})

module.exports = router