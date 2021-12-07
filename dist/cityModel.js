class CityModel {
    constructor () {
        this.cities = []
        this.newCity = {}
    }
    getCitiesArr = function() {
        return this.cities;
    };

    getDataFromDB = async function () {
        this.cities = await $.get(`/cities/`);
    
    };
    
    getCityData = async function (cityName) {
        this.newCity = await $.get(`/city/${cityName}`)
        this.cities.push(this.newCity)
    }

    saveCity = function(data){
        
        $.post("/city" ,data, function(response){
            console.log("city saved")
        })
    }

    async removeCity(cityName) {
        await $.ajax({
          url: `city/${cityName}`,
          method: "DELETE",
          success: function (response) {
            console.log("delete complete");
          },
        });
        // remove city from cities array
    }

    removeFromCities(cityName){
        
    }

}