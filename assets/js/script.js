var apiKey = "f80bb50772c40a878ed5746b10181c83";
let history = JSON.parse(localStorage.getItem("history")) || [];
// var search = [];
var main = $("main");
var historyStorage = $("#historyStorage");
var todayIconBarrier = $("#todayIconBarrier");
var todayContainer = $("#todayContainer");
var futureContainer = $("#futureContainer");


function getCoords(city) {
    var  coordinateAPIURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey
    var cityHeader = $('<h3>').attr('id', 'cityHeader').text(city);
fetch (coordinateAPIURL)
.then(function (response) {
    return response.json();
})
.then(function (data) { 
    history.push( {
        cityName: city,
        lat: data.coord.lat,
        lon: data.coord.lon,
    });
    getWeather(data.coord.lat,data.coord.lon);
    }); 
    historyStorage.prepend(cityHeader);
    $("#city").text(city);
}

function getWeather(lat,lon) {
    var oneCallAPIURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude={part}&units={imperial}&appid=" + apiKey;

fetch (oneCallAPIURL)
.then(function (response) {
    return response.json();
})
.then(function (data) { 
    console.log(data);
    printData(data);
});
}

function printData(weatherData) {

var unixTime = weatherData.current.dt
var unixSeconds = new Date(unixTime * 1000);
var date = (new Date(unixSeconds).toLocaleDateString("en-US"));
$("#date").text(date);
var icon = weatherData.current.weather[0].icon;
$("#temp").text(weatherData.current.temp);
$("#humidity").text(weatherData.current.humidity);
$("#windSpeed").text(weatherData.current.wind_speed);
$("#UV").text(weatherData.current.uvi);
$("#icon").attr("src", "http://openweathermap.org/img/wn/" + icon + "@2x.png");
console.log(icon);
};

function template() {
    var icon = $("<img>").attr("id", "icon");
    todayIconBarrier.append(icon);
    var city = $("<h2>").attr("id", "city");
    var date = $("<h3>").attr("id", "date");
    var temp = $("<p>").attr("id", "temp");
    var humidity = $("<p>").attr("id", "humidity");
    var windSpeed = $("<p>").attr("id", "windSpeed");
    var UV = $("<p>").attr("id", "UV");
    todayContainer.append(city,date,temp,humidity,windSpeed,UV);
};

$("#searchButton").on("click", function(){
    var cityInput = $("input").val();
    // search.push(cityInput);
    // console.log(search);
    getCoords(cityInput);
       
}); 

template();

