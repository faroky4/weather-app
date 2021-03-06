
const city = new CityModel()
const rend = new Renderer()

const loadPage = async function(){
    $('.data-div').empty()

    await city.getDataFromDB()
    rend.render(city.getCitiesArr());
}

$('#btn').on('click',async function(){
    $('.data-div').empty()

    const inputVal = $("#cityName-input").val()

    await city.getCityData(inputVal)
    rend.render(city.getCitiesArr());
});

$(document).on('click','#save-btn',function() {
    let relevantCityName= $(this).closest(".city-div").find(".nameOf-city")[0].innerHTML
    
    const arr = city.getCitiesArr()
    let result = arr.find(c => c.name == relevantCityName)

    city.saveCity(result)
})

$(document).on('click','#del-btn',function() {
    let relevantCityName= $(this).closest(".city-div").find(".nameOf-city")[0].innerHTML
    console.log(relevantCityName);
    city.removeCity(relevantCityName)
    loadPage()
})

loadPage()