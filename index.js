const express = require('express')
const mongoose = require('mongoose')
const url='mongodb://localhost/SocietyDBex'
const app = express()

mongoose.connect(url,{
    useNewUrlParser:true,
})
const con = mongoose.connection

con.on('open',()=>{
    console.log("connected......")
})

app.use(express.json())

const residentRouters = require('./routes/residents')
app.use('/residents',residentRouters)

app.listen(9000,()=>{
    console.log("Server Started......")
})