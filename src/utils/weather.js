const request = require('request')

const forecast = (longitude, latitude, callback) => {
    if ((isNaN(longitude) || typeof longitude !== 'number') || (isNaN(latitude) || typeof latitude !== 'number')) {
        console.error("Invalid location parameter. It must be a non-empty integer.");
        return;
    }
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(longitude)},${encodeURIComponent(latitude)}?unitGroup=metric&key=XYLW64JFC4L3ZU9WY6WDWW5XE&contentType=json`
    request({ url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to API', undefined)
        } else if (response.statusCode === 400) {
            callback('Wrong parameters', undefined)
        } else {
            const weatherData = response.body
            const temp = weatherData.currentConditions.temp
            const humidity = weatherData.currentConditions.humidity
            const description = weatherData.description
            callback(undefined, {
                temprature: temp,
                humidity,
                description
            })
        }
    })
}

module.exports = {
    forecast,

}