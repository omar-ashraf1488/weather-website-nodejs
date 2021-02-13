const path = require('path')
const express = require('express')
const hbs = require('hbs')

const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express() //to store the express-app
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views loacation
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Omar'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must wirte a location!'
        })
    }
    //const address = req.query.address
    geocode(req.query.address, (error, {
        latitude,
        longitude,
        location
    } = {}) => {
        if (error) {
            return res.send({
                error
            }) //return is another alternativ of using else
        }

        //const {latitude, longitude, location} = data

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                })
            }
            res.send({
                forecast: forecastData,
                //address : req.query.address,
                location
            })
        })
    })


})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Omar'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'helpful text',
        title: 'Help',
        name: 'Omar'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Omar',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Omar',
        errorMessage: 'Page not found.'
    })
})


app.listen(port, () => {
    console.log('Server is up on port 3000 !' + port);
}) //start the server 
//3000 is common development port