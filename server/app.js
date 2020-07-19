// const fs = require('fs')
const path = require('path')
const hbs = require('hbs')
const express = require('express')
const search = require('./search')

// Directory paths
const publicPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

hbs.registerPartials(partialsPath)

const app = express()

app.set('view engine', 'hbs')
app.set('views', viewsPath)

app.use(express.static('public'))

app.get('', (req, res) => {
    res.render('index')
})

app.get('/search', (req, res) => {
    console.log('passed get')
    const query = req.query.query
    console.log(query)
    search(query, (error=undefined, data=undefined) => {
        if (error) {
            return res.render('error', error)
        }
        return res.send(data)
    })
})

app.listen(3000, () =>{
    console.log('locator listening on port 3000')
})
