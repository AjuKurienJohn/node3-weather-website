const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/ba808e4f61fc0bacc9796552b3105516/${latitude},${longitude}`
    request({url, json: true}, (error, { body }) => {
        if (error) 
            callback(`Unable to connect to weather service. Error: ${error.message}`, undefined)
        else if (body.error)
            callback(`Unable to find location: ${body.error}`, undefined)
        else
            callback (undefined, 
                `${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees out. There is a ${body.currently.precipProbability}% chance of rain.`
                // {
                // summary: body.daily.data[0].summary,
                // temperature: body.currently.temperature,
                // precipProbability: body.currently.precipProbability
                // }
            )
    })
}

module.exports = forecast
