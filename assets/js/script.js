var apiKey = "f80bb50772c40a878ed5746b10181c83";
let history = JSON.parse(localStorage.getItem("history")) || [];
var search = [];


function getCoords(city) {
    var  coordinateAPIURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey
fetch (coordinateAPIURL)
.then(function (response) {
    return response.json();
})
.then(function (data) { 
    console.log(data.coord.lat,data.coord.lon);

    history.push( {
        cityName: city,
        lat: data.coord.lat,
        lon: data.coord.lon,
    });
    console.log(history);
    getWeather(data.coord.lat,data.coord.lon);
}); }

function getWeather(lat,lon) {
    var oneCallAPIURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude={part}&appid=" + apiKey;

fetch (oneCallAPIURL)
.then(function (response) {
    return response.json();
})
.then(function (data) { 
    console.log(data);
});
}


$("#searchButton").on("click", function(){
    var cityInput = $("input").val();
    search.push(cityInput);
    console.log(cityInput);
    getCoords(cityInput); 
}); 


