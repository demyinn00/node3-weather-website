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
            msg = body.location.name + ' is ' + body.current.weather_descriptions[0].toLowerCase() + 
                    '. It is currently ' + body.current.temperature + ' degrees';
            if (body.current.temperature === body.current.feelslike)
            {
                msg = msg + '. The humidity is ' + body.current.humidity +
                    ' and the UV index is ' + body.current.uv_index + '.'; 
            }
            else 
            {
                msg = msg + ', but it feels like ' + body.current.feelslike + ' degrees' +
                    '. The humidity is ' + body.current.humidity +
                    ' and the UV index is ' + body.current.uv_index + '.';
            }
            callback(undefined, msg);
        }
    });
}

module.exports = forecast;