
const express = require('express')
//const moment = require('moment')
const urllib = require('urllib')
const router = express.Router()
const City = require('../model/City')
const API_KEY = 'fe3c83574bb6f19d60cf0b424088d5e1'

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/weatherDB', { useNewUrlParser: true })

router.get( '/city/:cityName' , function(request,response) {
    let city = request.params.cityName

    urllib.request(`api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}` , function (err, data, res){
        if (err) {
            throw err; 
        }
        
        const recipesData = data.toString()
        const jsonData = JSON.parse(recipesData)

        const theCity = new City (
            {
                name: jsonData.name,
                temperature: jsonData.main.temp,
                condition: jsonData.weather[0].main,
                conditionIcon: `http://openweathermap.org/img/wn/${jsonData.weather[0].icon}@2x.png`,

            });
        response.send(theCity)
    }) 

})

router.get( '/cities' , function(req,res) {
    City.find({}, function(err, cities){
        res.send(cities)
    })
})

router.post('/city' , function(request,response){
    let addCity = new City({
        name: request.body.name,
        temperature: request.body.temperature,
        condition: request.body.condition,
        conditionIcon: request.body.conditionIcon,
    });
    addCity.save().then((city) => {
        console.log(`The name of city is : ${city.name} ${city.temperature}`);
    });
    response.send(addCity);
    
})

router.delete('/city/:cityName' , function(request,response){
    let cityName = request.params.cityName;
    City.findOneAndDelete({ name: cityName }, function (err, city) {
        console.log(city);
    });
    response.end();
})

module.exports = router;