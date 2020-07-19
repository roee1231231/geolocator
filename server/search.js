const request = require('request')

const search = (query, callback) => {
    url = `http://api.ipstack.com/${query}?access_key=6963eb03a50f659cd5b2c1b2a4d8dd07&format=1`
    request({ url, json:true}, (error, response) => {
        if (error) {
            callback(error)
        }
        callback(error, response)
    })
}

module.exports = search;