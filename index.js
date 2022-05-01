const express = require('express')
const mongoose= require('mongoose')
const url='mongodb://localhost/HospitalDBex'
const app = express()

mongoose.connect(url,{
    useNewUrlParser:true,
})

const con = mongoose.connection

con.on('open',()=>{
    console.log("connected.......")
})

app.use(express.json())

const userRouters= require('./routes/users')
app.use('/users',userRouters)

app.listen(7000,()=>{
    console.log("Server Started")
})