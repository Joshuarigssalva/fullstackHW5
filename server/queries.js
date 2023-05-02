// Connect to Postgres using the node-postgres package

const { response, request } = require('express')

const POOL = require('pg').Pool

const pool = new POOL({
  user: 'me',
  host: 'localhost',
  database: 'api',
  password: 'password',
  port: 5432,
})

// Create all the functions that will be our request handlers in our express server

//class code and notes example
const creatingLink = (request, response) => {
    //take the data the user passes us and insert it into our table
    const name = request.body.name
    const URL = request.body.URL

    pool.query('INSERT INTO namelinks (name, link) VALUES ($1, $2)', 
    [name, URL], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`Link added with ID: ${results.insertID}`)
    })

}
//end of class code and notes example

//GET all links
const getLinks = (request, response) => {
    //get back all the data currently in the database
    pool.query('SELECT * FROM namelinks ORDER BY id ASC', 
    (error, results) => {
        if (error) {
            throw error
        }
        
        response.status(200).json(results.rows)

    })
}

//GET a single link by ID
const getLinkById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM namelinks WHERE id = $1', [id], 
    (error, results) => {
        if (error) {
            throw error
        }

        response.status(200).json(results.rows)

    })
}

//POST a new link
const createLink = (request, response) => {
    const { name, link } = request.body

    pool.query('INSERT INTO namelinks (name, link) VALUES ($1, $2) RETURNING *', 
    [name, link], (error, results) => {
        if (error) {
            throw error
        }

        response.status(201).send(`Link added with ID: ${results.rows[0].id}`)

    })
}

//PUT updated data in an existing Link
const updatedLink = (request, response) => {
    const id = parseInt(request.params.id)
    const { name, link } = request.body

    pool.query(
        'UPDATE namelinks SET name = $1, link = $2 WHERE id = $3',
        [name, link, id],
        (error, results) => {
            if (error) {
                throw error
            }

            response.status(200).send(`Link modified with ID: ${id}`)

        }
    )

}

//DELETE a Link
const deleteLink = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM namelinks WHERE id = $1', 
    [id], (error, results) => {
        if (error) {
            throw error
          }

          response.status(200).send(`Link deleted with ID: ${id}`)

    })
}

module.exports = {
    getLinks,
    getLinkById,
    createLink,
    updatedLink,
    deleteLink,

    //class code and notes example
    creatingLink
    //end of class code and notes and example
}


