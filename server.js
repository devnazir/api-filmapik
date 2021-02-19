const express = require('express')
const app = express()
const cors = require('cors')
const getMovies = require('./scraper/scraper')
const jsdom = require('jsdom')
const { JSDOM } = jsdom
const axios = require('axios')

const domain = 'http://103.194.171.18'

app.use(cors({ origin: '*' }))

app.get('/', function (req, res) {
    res.json({
        docs: 'Please read documentation at https://github.com/devnazir/api-filmapik'
    })
})

function checkNumPage(req) {
    return req.query.page ?? "1"
}

function checkGdrive(req) {
    return req.query.gdrive ?? false
}

function checkSearch(req) {
    return req.query.search.toLowerCase()
}

async function scrapHomePage() {
    const html = await axios(`${domain}`)
    const response = html.data
    const { window } = new JSDOM(response)

    return window
}


app.get('/search', function(req, res) {
    const q = req.query.q
    const url = `${domain}/page/${checkNumPage(req)}?s=${q}`
    getMovies(req, res, url, checkNumPage(req), checkGdrive(req))
})

app.get('/latest', function (req, res) {
    const url = `${domain}/latest/page/${checkNumPage(req)}`
    getMovies(req, res, url, checkNumPage(req), checkGdrive(req))
})

app.get('/country', async function (req, res) {
    const country = []

    const items = (await scrapHomePage()).document.querySelectorAll('#menu li#menu-item-13566 .menu-item')
    items.forEach(item => {
        country.push(item.textContent.toLowerCase())
    })

    if (country.includes(checkSearch(req))) {
        const url = `${domain}/negara/${checkSearch(req)}/page/${checkNumPage(req)}`
        getMovies(req, res, url, checkNumPage(req), checkGdrive(req))
        return
    }

    res.json({ error: `Movies in ${checkSearch(req)} not found` })
})

app.get('/category', async function(req, res) {
    const category = []

    const items = (await scrapHomePage()).document.querySelectorAll('#menu li.menu-item .menu-item-object-category')
    items.forEach(item => {
        category.push(item.textContent.toLowerCase())
    })

    category.push('box-office', 'boxoffice')

    if (category.includes(checkSearch(req))) {
        const url = `${domain}/category/${checkSearch(req)}/page/${checkNumPage(req)}`
        getMovies(req, res, url, checkNumPage(req), checkGdrive(req))
        return
    }

    res.json({ error: `Category ${checkSearch(req)} not found` })
})

app.get('*', function (req, res) {
    res.send({ error: "Error" })
})

app.listen(process.env.PORT || 8000, () => console.log("Server work at localhost:8000"))