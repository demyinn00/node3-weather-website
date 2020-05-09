const request = require('request');

const forecast = (lat, long, callback) =>
{
    const url = 'http://api.weatherstack.com/current?' +
    'access_key=78e3c853c816e868057e9a22562c1a15&query=' + 
    lat + ',' + long + '&units=f';

    request({url, json: true}, (error, {body}) => {
        if (error)
        {
            callback('Unable to connect to weather services!', undefined);
        }
        else if (body.error)
        {
            callback(undefined, 'Unable to find location!');
        }
        else
        {
            const msg = body.location.name + '. ' + body.current.weather_descriptions[0] + 
                '. It is currently ' +
                body.current.temperature +
                ' degrees, but it feels like ' + 
                body.current.feelslike + ' degrees.';
            callback(undefined, msg);
        }
    });
}

module.exports = forecast;