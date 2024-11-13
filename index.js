// import express

const express = require('express');

// import cors

const cors = require('cors');

// import router

const router= require('./router')

// import connection
require('dotenv').config()
require('./connection')


// create a server

const pfServer = express();

//server using cors 
pfServer.use(cors())



//middleware to parse the data received as json
pfServer.use(express.json());

// export upload folder from the server side
pfServer.use('/upload',express.static('./uploads'))

//use router
pfServer.use(router)

// Port

const PORT = 4000 || process.env.PORT


//Listen

pfServer.listen(PORT,()=>{
    console.log(`server running successfully at port number ${PORT}`)
})

// pfServer.get('/',(req,res)=>{
//     res.send('get response Received')
// })
// pfServer.post('/',(req,res)=>{
//     res.send('post response Received')
// })
// // pfServer.put('/',(req,res)=>{
//     res.send('put response Received')
// })
// pfServer.delete('/',(req,res)=>{
//     res.send('delete response Received')
// })