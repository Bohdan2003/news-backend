const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')
const path = require("path")
const helmet = require('helmet')

const { PORT, MONGODB_URL, BASE_URL } = require('./keys')

const sliderRoutes = require('./routes/slider')
const regionsRoutes = require('./routes/regions')
const allRoutes = require('./routes/all')
const editorialRoutes = require('./routes/editorial')
const videoRoutes = require('./routes/video')
const sectionRoutes = require('./routes/section')
const columnsRoutes = require('./routes/columns')
const promotionRoutes = require('./routes/promotion')

const corsOptions = {
    origin: BASE_URL,
    optionsSuccessStatus: 200 
}

app.use(helmet({
    crossOriginResourcePolicy: false
}))
app.use(cors())
app.use(bodyParser.json())
app.use(express.static(path.resolve(__dirname, 'static')))

app.use('/slider', sliderRoutes)
app.use('/regions', regionsRoutes)
app.use('/all', allRoutes)
app.use('/editorial', editorialRoutes)
app.use('/video', videoRoutes)
app.use('/section', sectionRoutes)
app.use('/columns', columnsRoutes)
app.use('/promotion', promotionRoutes)

async function start() {
    try {
        await mongoose.connect(MONGODB_URL, {
            useNewUrlParser: true
        })
        app.listen(PORT, () => {
            console.log(`App listening on port ${PORT}`)
        })
    } catch (e) {
        console.log(e)
    }   
}

start()

