const request = require('request')

const geoCode = (location, callback) => {
    const geoCodeURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?limit=1&access_token=pk.eyJ1IjoiYWp1a2pvaG4iLCJhIjoiY2p4ZzhrcnBuMGZhdDNvb2plazFnenBzNiJ9.nY5Wao283ZHHEhdI_9pW9Q` 
    request({url: geoCodeURL, json: true}, (error, { body }) => {
        if (error) 
            callback(`Unable to connect to geocode service. Error: ${error.message}`, undefined)
        else if (body.features.length === 0)
            callback('Unable to find Location', undefined)
        else {
            callback(undefined, {
                longitude: body.features[0].center[0], 
                latitude: body.features[0].center[1],
                location: body.features[0].place_name})
        }
    })
}

module.exports = geoCode
