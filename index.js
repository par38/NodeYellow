const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

require('dotenv').config()

const app = express()
const yellowsRoute = require('./routes/yellowsRoute')


app.use(cors())


app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/yellows', yellowsRoute)

app.listen(process.env.PORT || 3004, () => console.log('Listening server on port 3004'))
