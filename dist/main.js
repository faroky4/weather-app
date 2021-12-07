
const city = new CityModel()
const rend = new Renderer()

const loadPage = async function(){
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
    let relevantCityIcon= $(this).closest(".city-div").find(".icon-city")[0].src
    let relevantCityTemper= $(this).closest(".city-div").find(".temperature-city")[0].innerHTML
    let relevantCityCondition= $(this).closest(".city-div").find(".condition-city")[0].innerHTML

    const cityToSave= {
        name: relevantCityName,
        temperature: relevantCityTemper,
        condition: relevantCityCondition,
        conditionIcon: relevantCityIcon
    }
    city.saveCity(cityToSave)
    $('#save-btn').css("display","none")
    $('#del-btn').css("display","block")
})

$(document).on('click','#del-btn',function() {
    let relevantCityName= $(this).closest(".city-div").find(".nameOf-city")[0].innerHTML
    console.log(relevantCityName);
    city.removeCity(relevantCityName)
    
})

loadPage()