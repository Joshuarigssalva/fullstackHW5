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


//Middleware //class code notes
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


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


// Routes for the client to call
app.get('/', (request, response) =>{
    // define what should happen
    response.sendFile(path.resolve(__dirname, '../favlinks/build',
     'index.html'))
})

// start app at PORT
app.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`)
})

//new code from tutorial for postgres
const db = require('./queries')

app.get('/myfavlinks', db.getLinks)
app.get('/myfavlinks/:id', db.getLinkById)
app.post('/myfavlinks', db.createLink)
app.put('/myfavlinks/:id', db.updatedLink)
app.delete('/myfavlinks/:id', db.deleteLink)

//class code and notes example
//app.post('/new', db.creatingLink)




