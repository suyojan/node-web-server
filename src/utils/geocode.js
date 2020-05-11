const request = require('request');
const values = require('../values');
const urlMap = 'https://api.mapbox.com/geocoding/v5/mapbox.places/LOCATION' + '.json?access_token=' + values.MB_API_KEY;

const geocode = (location, callback) => {
    const locationUrl = urlMap.replace('LOCATION', encodeURIComponent(location));
    request({url: locationUrl, json: true}, (error, data) => {
        if(error){
            return callback(error);
        }
        const latLong = {
            lat: data.body.features[0].center[1],
            long: data.body.features[0].center[0]
        }
        callback(undefined, latLong);
    })
}

module.exports = {geocode}
