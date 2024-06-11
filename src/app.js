const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { geocode } = require('./utils/geocode')
const { forecast } = require('./utils/weather')
// nodemon is a package that helps in restarting the server when saving changes in the file

const app = express()

// current directories in use 
const HomeDir = path.join(__dirname, '../public')
const partialsDirectory = path.join(__dirname, '../templates/partials')

// setting handlebar engine and directories for templates and partials
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '../templates/views'));
hbs.registerPartials(partialsDirectory)


app.use(express.static(HomeDir))


app.get('', (req, res) => {
    res.render('index', {
        title: "Weather",
        footer: "Created by Abdelrahman",

    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About Me",
        message: "This is me",
        footer: "Created by me"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help",
        message: "Search for anything about the weather",
        footer: "Helping clients with the server",
    })
})

app.get('/data', (req, res) => {
    res.send({
        foundation: true,
        satistaction: null
    })
})


app.get('/weather', (req, res) => {
    const address = req.query.address
    if (!address) {
        return res.send({
            error: "A valid address is required",
        })
    }
    geocode(address, (error, { latitude, longitude } = {}) => { //Toronto, Montreal, Albania, Egypt

        if (error) return res.send({
            error,
        })
        forecast(latitude, longitude, (error, { temprature, humidity, description } = {}) => { // Should specify a default value when destructuring objects
            if (error) return res.send({
                error,
            })
            res.send({
                description,
                address: address,
                temprature,
                humidity,
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: "Help article not found",
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: "Cannot access this page",
    })
})


app.listen(port = 3000, () => {
    console.log("server is running")
})