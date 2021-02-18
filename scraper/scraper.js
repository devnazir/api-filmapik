const jsdom = require('jsdom')
const { JSDOM } = jsdom
const axios = require('axios')

async function scrapping(res, url) {
    try {
        const response = await axios(`${url}`)
        return response.data
    } catch (err) {
        res.json({ error: err.Error })
    }
}

async function getJSON(req, res, url, numPage) {
    try {
        const html = await scrapping(res, url)
        const { window } = new JSDOM(html)
        const result = []

        const movies = Array.from(window.document.querySelectorAll('.movies-list .ml-item'))
        await Promise.all(movies.map(async movie => {
            const officialWeb = movie.querySelector('.ml-mask').getAttribute('href')
            const quality = movie.querySelector('.mli-quality').textContent
            const rating = movie.querySelector('.mli-rating').textContent
            const thumbnail = movie.querySelector('img').getAttribute('data-original')
            const title = movie.querySelector('.mli-info h2').textContent

            result.push({
                title,
                thumbnail,
                rating,
                quality,
                officialWeb,
                video: await getIframe(req, officialWeb)
            })
        }))

        result.forEach(movie => {
            delete movie.officialWeb
        })

        res.json({ result, page: numPage })
    } catch (err) {
        console.log(err)
    }
}

async function getIframe(req, officialWeb) {
    try {
        let playVideo = `${officialWeb}/play`
        // if (req.url === "tvshows") {
        //     playVideo = `${officialWeb}`
        // }
        const response = await axios(playVideo)
        const { window } = new JSDOM(response.data)
        const iframe = window.document.querySelector('.iframe #myFrame').getAttribute('src')
        return await getVideoLink(iframe)
    } catch (err) {
        console.log(err)
    }
}

async function getVideoLink(iframe) {
    try {
        const response = await axios(iframe)
        const { window } = new JSDOM(response.data)
        const linkVideo = window.document.querySelector("iframe").src
        return linkVideo
    } catch (err) {
        console.log(err)
    }
}

function getMovies(req, res, url, numPage) {
    getJSON(req, res, url, numPage)
}

module.exports = getMovies