const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geoCode = require('./utils/geoCode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//define Paths for Express config
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup HandleBars
app.set('views', viewsPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

//Setup Static Dir
app.use(express.static(publicPath))

// const commonParams = {
//     name: 'AJ John'
// }
// app.get('', (req, resp) => {
//     resp.render('index', Object.assign({
//         title: 'Weather'}, commonParams)
//     )
// })

app.get('', (req, resp) => {
    resp.render('index', {
        title: 'Weather', 
        name: 'AJ John'
    })
})

app.get('/about', (req, resp) => {
    resp.render('about', {
        title: 'About Me',
        name: 'AJ John'
    })
})

app.get('/help', (req, resp) => {
    resp.render('help', {
        title: 'Help',
        name: 'AJ John',
        msg: 'The weather app is great'
    })
})

app.get('/weather', (req, resp) => {
    if (!req.query.location)
        return resp.send({
            error: 'You must provide a location!'
        })
    geoCode(req.query.location, (error, {latitude, longitude, location} = {}) => {
        if (error)
            return resp.send({ error })  
            forecast(latitude, longitude, (error, fcData) => {
            if (error)
                return resp.send({ error })  
            resp.send({
                forecast: fcData,
                location,
                address: req.query.location
            })
        })
    })  
})


app.get('/help/*', (req, resp) => {
    resp.render('404', {
        title: '404 page',
        name: 'AJ John',
        errorMsg: 'Help artice not found'
    })
})

app.get('*', (req, resp) => {
    resp.render('404', {
        title: '404 page',
        name: 'AJ John',
        errorMsg: 'Page was not found'
    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}.`)
})