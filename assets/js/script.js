var apiKey = "f80bb50772c40a878ed5746b10181c83";
let history = JSON.parse(localStorage.getItem("history")) || [];
// var search = [];
var main = $("main");
var historyStorage = $("#historyStorage");
var todayIconBarrier = $("#todayIconBarrier");
var todayContainer = $("#todayContainer");
var todayContainer2 = $("#todayContainer2");
var futureContainer = $("#futureContainer");
var weekForecastContainer = [$("#futureContainer").children()]


function getCoords(city) {
    var  coordinateAPIURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey
    var cityHeader = $('<h3>').addClass('cityHeader').text(city);
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
    var oneCallAPIURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + apiKey;

fetch (oneCallAPIURL)
.then(function (response) {
    return response.json();
})
.then(function (data) { 
    console.log(data);
    printData(data);
    futureTemplate(data);
});
}

function printData(weatherData) {

var unixTime = weatherData.current.dt
var unixSeconds = new Date(unixTime * 1000);
var date = (new Date(unixSeconds).toLocaleDateString("en-US"));
$("#date").text(date);
var icon = weatherData.current.weather[0].icon;
$("#temp").text(weatherData.current.temp + "°");
$("#humidity").text(weatherData.current.humidity + "% humidity");
$("#windSpeed").text(weatherData.current.wind_speed + "mph");
$("#UV").text(weatherData.current.uvi);
$("#icon").attr("src", "http://openweathermap.org/img/wn/" + icon + "@2x.png");
$("img").show();
UVindex();
};

// function template() {
//     var icon = $("<img>").attr("id", "icon");
//     todayIconBarrier.prepend(icon);
//     var city = $("<h2>").attr("id", "city");
//     var date = $("<h3>").attr("id", "date");
//     var tempContainer = $("<div>").attr("id", "tempContainer");
//     todayContainer.prepend(city,date,tempContainer);    
//     var temp = $("<p>").attr("id", "temp");
//     var tempIcon = $("<img>").attr({id:"tempIcon", src:"./assets/images/sunnyTemp.png"});
//     tempContainer.prepend(tempIcon,temp);
//     var humidityContainer = $("<div>").attr("id", "humidityContainer");
//     var windSpeedContainer = $("<div>").attr("id", "windSpeedContainer");
//     var UVcontainer = $("<div>").attr("id","UVcontainer");
//     todayContainer2.append(humidityContainer,windSpeedContainer,UVcontainer);
//     var humidityIcon = $("<img>").attr({id:"humidityIcon", src:"./assets/images/humidity.png"});
//     var humidity = $("<p>").attr("id", "humidity");
//     humidityContainer.append(humidityIcon, humidity);
//     var windSpeed = $("<p>").attr("id", "windSpeed");
//     windSpeedContainer.append(windSpeed);
//     var UV = $("<p>").attr("id", "UV");
//     UVcontainer.append(UV);
// };
function futureTemplate(data) {
    
    for (let i = 0; i < weekForecastContainer.length; i++) {
        for (let i = 0; i < iterable.length; i++) {
          if (weekForecastContainer)
        }
        
      var date = $("<h3>").addClass("futureDate").text((new Date((data.daily[i].dt*1000)).toLocaleDateString("en-US")));
      var temp = $("<p>").addClass("futureTemp").text(data.daily[i].temp.max);
      var icon = $("<img>").addClass("futureIcon").attr("src","http://openweathermap.org/img/wn/" + data.daily[i].weather[0].icon + "@2x.png");
      var humidity = $("<p>").addClass("futureHumidity").text(data.daily[i].humidity);
      eachFuture.append(date, icon, temp, humidity);
    }
}

function UVindex() {
    var UV = $('#UV').html();
    let UVelement = $('#UV');
    console.log(UVelement);
    console.log(UV);
    if (UV < 3) {
        UVelement.addClass('low');
    } else if (3 < UV < 6) {
        UVelement.addClass('moderate');
    } else if (6 < UV < 8) {
        UVelement.addClass('high');
    } else if (8 < UV < 11) {
        UVelement.addClass('veryHigh');
    } else if (UV > 11) {
        UVelement.addClass('extreme');
    }
};

// function lightDark() {
//     if 

// }

$("#searchButton").on("click", function(){
    var cityInput = $("input").val();
    getCoords(cityInput);
       
});
$("#input").keyup(function(event) {
    if (event.keyCode === 13) {
        $("#searchButton").click();
    }
}); 

// template();
getCoords("Raleigh");
