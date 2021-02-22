const express = require('express')
const app = express()
const cors = require('cors')
const myModule = require('./scraper/scraper')
const getJSON = myModule.getJSON
const scrapping = myModule.scrapping
const videoLink = myModule.getVideoLink
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

function checkVideo(req) {
    return req.query.video ?? false
}

function checkSearch(req) {
    return req.query.search.toLowerCase()
}

function maxResult(req) {
    return req.query.maxResult ?? 21
}

async function scrapHomePage() {
    const html = await axios(`${domain}`)
    const response = html.data
    const { window } = new JSDOM(response)

    return window
}

app.get('/play', async function (req, res) {
    try {
        const movieId = req.query.id
        const target = `https://www.googleapis.com/customsearch/v1?key=AIzaSyDEkTkys3gPYdUvcG7lIFHWSnh93X1xSho&cx=017552896205506834830:6zakuimpdcb&q=${movieId}`
        const response = await axios(target)

        if (response.data.items) {
            let url = response.data.items[0].link

            if (!url.includes('play')) {
                url = `${url}/play`
            }

            const html = await scrapping(url)
            const { window } = new JSDOM(html)
            const iframe = window.document.querySelector('.iframe #myFrame').getAttribute('src')
            res.json({ link: await videoLink(iframe) })
        } else {
            res.json({ error: "Movie not Found" })
        }

    } catch (err) {

        console.log(err)
    }
})

app.get('/search', function (req, res) {
    const q = req.query.q
    const url = `${domain}/page/${checkNumPage(req)}?s=${q}`
    getJSON(res, url, checkNumPage(req), checkVideo(req), maxResult(req))
})

app.get('/latest', function (req, res) {
    const url = `${domain}/latest/page/${checkNumPage(req)}`
    getJSON(res, url, checkNumPage(req), checkVideo(req), maxResult(req))
})

app.get('/country', async function (req, res) {
    try {
        const country = []

        const items = (await scrapHomePage()).document.querySelectorAll('#menu li#menu-item-13566 .menu-item')
        items.forEach(item => {
            country.push(item.textContent.toLowerCase())
        })

        if (country.includes(checkSearch(req))) {
            const url = `${domain}/negara/${checkSearch(req)}/page/${checkNumPage(req)}`
            getJSON(res, url, checkNumPage(req), checkVideo(req), maxResult(req))
            return
        }

        res.json({ error: `Movies in ${checkSearch(req)} not found` })
    } catch (err) {
        console.log(err)
    }
})

app.get('/category', async function (req, res) {
    try {
        const category = []

        const items = (await scrapHomePage()).document.querySelectorAll('#menu li.menu-item .menu-item-object-category')
        items.forEach(item => {
            category.push(item.textContent.toLowerCase())
        })

        category.push('box-office')

        if (category.includes(checkSearch(req))) {
            const url = `${domain}/category/${checkSearch(req)}/page/${checkNumPage(req)}`
            getJSON(res, url, checkNumPage(req), checkVideo(req), maxResult(req))
            return
        }

        res.json({ error: `Category ${checkSearch(req)} not found` })
    } catch (err) {
        console.log(err)
    }
})

app.get('*', function (req, res) {
    res.json({ error: "Error" })
})

app.listen(process.env.PORT || 8000, () => console.log("Server work at localhost:8000"))