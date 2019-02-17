const config = require('./utils/config')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const blogRouter = require('./controllers/blogs')
const { errorHandler } = require('./utils/middleware')

mongoose.connect(config.MONGO_URL, { useNewUrlParser: true })

app.use(cors())
app.use(bodyParser.json())

app.use('/api/blogs', blogRouter)

app.use(errorHandler)

module.exports = app
