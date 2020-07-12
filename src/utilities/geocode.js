const request = require('postman-request');

const geoCode = (address,callback) =>{
        const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiZGVlcGthamFpbiIsImEiOiJjazdwNWZocWgwNDB6M25sNjNmNmI2a3l5In0.vkztz8wkHSRbvC3bRX-zxg&limit=1';
        request({url,json:true},(error,{body}={}) =>{
                if(error)
                        callback('Service Unavailable!');
                else if(body.features.length === 0)
                        callback('unable to find location. Try another search.');
                else
                        callback(null,{
                               longitude: body.features[0].center[1],
                               latitude:  body.features[0].center[0],
                               location:  body.features[0].place_name
                        });
        });
}

module.exports = geoCode;