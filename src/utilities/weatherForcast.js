const request = require('request');
 const func = (long,lat,callback) => {
         let url = 'https://api.darksky.net/forecast/ffe5c9e0108aed22f2e9204474cddca5/';
        if(long)
                url = url+long;
        if(lat)
                url = url+','+lat;
    //,-122.4233
   request({url,json:true},(error,{body} ={}) => {
           if(error)
                   callback('weather forcast Service Unavialable!');
           else if(body.error)
                callback(body.error);
           else
           callback(null,
           'Its '+body.daily.data[0].summary+' It is currently '+body.currently.temperature +' degree Fahrenheit out there.There is '+ body.currently.precipProbability+'% chances of rain.'
           );
                   
   });
}

module.exports = func;