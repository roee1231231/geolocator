// const fs = require('fs')
const path = require('path')
const hbs = require('hbs')
const express = require('express')
const search = require('./search')
debugger

// Directory paths
const publicPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

hbs.registerPartials(partialsPath)

const app = express()
const port = process.env.PORT || 3000

app.set('view engine', 'hbs')
app.set('views', viewsPath)

app.use(express.static('public'))

app.get('', (req, res) => {
    res.render('index')
})

app.get('/myip', (req, res) => {
    debugger
    const query = req.ip
    console.log('The ip is:')
    console.log(query)
    debugger
    search(query, (error=undefined, data=undefined) => {
        if (error) {
            return false
        }
        debugger
        return res.send(data)
    })
})

app.get('/search', (req, res) => {

    debugger

    const query = req.query.query
    search(query, (error=undefined, data=undefined) => {
        if (error) {
            return res.render('error', error)
        }
        return res.send(data)
    })
})

app.listen(port, () =>{
    console.log(`locator listening on port ${port}`)
})
