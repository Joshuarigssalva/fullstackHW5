// importing express into our project
const express = require("express")

// import path module
const path = require('path')

// define a PORT for our server to run
const PORT = 8000

// initialize an express application
const app = express()

//host react app as static files
app.use(express.static(path.resolve(__dirname, '../client/build')))

// define some routes
app.get('/', (request, response) =>{
    // define what should happen
    response.sendFile(path.resolve(__dirname, '../client/build',
     'index.html'))
})