const request = require('postman-request');
 const forecast = (long,lat,callback) => {
         let url = 'http://api.weatherstack.com/current?access_key=0adc4debdfc940bb14c710648b6e1556';
         if(long)
         url = url+"&query="+long;
        if(lat && long)
         url = url+','+lat;
    //,-122.4233
   request({url,json:true},(error,{body} ={}) => {
           if(error)
                   callback('weather forcast Service Unavialable!');
           else if(body.error)
                callback(body.error);
           else
           callback(null,
           'Its '+body.current.weather_descriptions[0]+ ' and '+body.current.temperature +' degree Fahrenheit out there. cloud cover is '+body.current.cloudcover+'% and average visibility is '+body.current.visibility+'+km.'
           );
                   
   });
}

module.exports = forecast;