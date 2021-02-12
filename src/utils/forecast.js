const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=dc4b37039db7f47a93086f3b62a2ad25&query=' + latitude + ',' + longitude + ''

    request({
        url: url,
        json: true
    }, (error, response) => {
        const {
            body
        } = response //ES6, Object destructuring

        if (error) {
            callback('Unable to connect to weather service !', undefined)
        } else if (body.error) {
            callback('Unable to find location !', undefined)
        } else {
            callback(undefined,
                'The temperature is ' + body.current.temperature +
                ' and It feels like ' + body.current.feelslike)

        }
    })
}

module.exports = forecast