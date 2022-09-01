const mongoose = require('mongoose')
const db = mongoose.connection
require('dotenv').config()

mongoose.connect(process.env.URL, { useNewUrlParser: true })



db.on('error', (error) => { console.error(error) })
db.once('open', () => { console.log("connected to DataBase !") })
