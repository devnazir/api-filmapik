const express = require('express')
const app = express()
const cors = require('cors')
const getMovies = require('./scraper/scraper')

app.use(cors({ origin: '*' }))

app.get('/', function(req, res) {
    res.json({
        docs: 'Please read documentation at https://github.com/devnazir/api-filmapik'
    })
})

app.get('/latest', function(req, res) {
    let numPage = req.query.page ?? "1"
    const url = `http://103.194.171.18/latest/page/${numPage}`
    getMovies(req, res, url, numPage)
})

// app.get('/tvshows', function(req, res) {
//     let numPage = req.query.page ?? "1"
//     const url = `http://103.194.171.18/tvshows/page/${numPage}`
//     getMovies(req, res, url, numPage)
// })

app.get('*', function(req, res) {
    res.send({error: "Error"})
})

app.listen(process.env.PORT || 8000, () => console.log("Server work at localhost:8000"))

