const request = require('request')

const geocode = (place, callback) => {
    const url = `https://api.geocod.io/v1.7/geocode?q=${encodeURIComponent(place)}&api_key=6aa6664a6690112229660d622aa142a0b6946c6&limit=1`
    request({ url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to API', undefined)

        } else if (response.body.error) {
            callback(response.body.error, undefined)

        } else {
            const data = response.body
            const latitude = data.results[0].location.lat
            const longitude = data.results[0].location.lng
            callback(undefined, {
                latitude: latitude,
                longitude: longitude
            })
        }

    })
}



module.exports = { 
    geocode,
}