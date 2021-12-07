class Renderer {
    constructor(){
        this.cities
    }

    render(data){
        this.cities = data;
        const citiesData = { "citiesData": data };
        
        const source = $("#cities-template").html();
        const template = Handlebars.compile(source);
        const newHTML = template(citiesData);

        $(".data-div").append(newHTML);
    }
}
