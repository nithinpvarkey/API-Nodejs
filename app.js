const express = require('express')
const app= express()

const mongoose=require ('mongoose')
const bodyParser=require('body-parser')
require('dotenv/config')

app.use(bodyParser.json())

const bidRoute= require('./routes/bids')
const authRoute= require('./routes/auth')
const auctionRoute= require('./routes/auction')

app.use('/api/bid',bidRoute)
app.use('/api/user',authRoute)
app.use('/api/auction',auctionRoute)


mongoose.connect(process.env.DB_CONNECTOR,()=>{
    console.log("DataBase is now connected")
})

app.listen(3009,()=>{
    console.log("server is running")
})