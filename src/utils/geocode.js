const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?limit=2&access_token=pk.eyJ1Ijoid2F0c29uMjYwMSIsImEiOiJja2tkdm9jdzYxMHZ2MnZvMDAwdGgwODE2In0.6VqnRllDT3whYS74YOj4QQ'

    request({url: url, json: true},(error, response) => {
        const {body} = response //ES6, Object destructuring
        
        if (!error && body.features.length > 0) {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        } else if (body.features.length === 0) {
            callback('Unable to find location!')
        } else {
            callback('Unable to connect to location service!', undefined)
        }
    })
}

module.exports = geocode