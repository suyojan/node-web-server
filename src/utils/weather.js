const request = require('request')
const values = require('../values')

const urlWeather = 'http://api.weatherstack.com/current?query=LATLONG&access_key=' + values.WM_API_KEY;
const weather = (latLong, callback) => {
    const weatherUrl = urlWeather.replace('LATLONG', encodeURIComponent(latLong.lat + "," + latLong.long));
    request({url: weatherUrl, json: true}, (error, data) => {
        if(error){
            return callback(error);
        }
        const prediction = {
            temp: data.body.current.temperature,
            precip: data.body.current.precip
        }
        callback(undefined, prediction);
    })
}

module.exports = {weather}