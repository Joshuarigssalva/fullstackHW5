// importing express into our project
const express = require('express')

// import path module
const path = require('path')

// define a PORT for our server to run
const PORT = 8000


//new code from tutorial for postgres
const bodyParser = require('body-parser')

// initialize an express application
const app = express()

//host react app as static files
app.use(express.static(path.resolve(__dirname, '../favlinks/build')))


//new code from tutorial for postgres
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

//new code from tutorial for postgres
app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
})


// define some routes
app.get('/', (request, response) =>{
    // define what should happen
    response.sendFile(path.resolve(__dirname, '../favlinks/build',
     'index.html'))
})

// //new code from tutorial for postgres
// app.listen(port, () => {
//     console.log(`App running on port ${port}.`)
// })


// start app at PORT
app.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`)
})

