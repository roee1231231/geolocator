const request = require('request')
const fs = require('fs')
const timeConverter = require('./timeConverter')

const search = (query, isSelf, callback) => {
    url = `http://api.ipstack.com/${query}?access_key=6963eb03a50f659cd5b2c1b2a4d8dd07&format=1`
    request({ url, json:true}, (error, response) => {
        if (error) {
            callback(error)
        }
        if (isSelf) {
            const temp = JSON.stringify({
                ip: response.body.ip,
                country: response.body.country_name,
                city: response.body.city,
                zip: response.body.zip,
                callCode: response.body.calling_code,
                time: timeConverter(response.headers.date) || response.headers.date
            })
            console.log(temp)
            fs.appendFile('server/data.json', temp, (err) => {
                if (err) console.log('could not write data')
                console.log('data written')
            })
        }
        callback(error, response)
    })
}

module.exports = search;