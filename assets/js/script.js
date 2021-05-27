var apiKey = "f80bb50772c40a878ed5746b10181c83";
let history = JSON.parse(localStorage.getItem("history")) || [];
var sessionHistory = [];
var main = $("main");
var historyStorage = $("#historyStorage");
var todayIconBarrier = $("#todayIconBarrier");
var todayContainer = $("#todayContainer");
var todayContainer2 = $("#todayContainer2");
var futureContainer = $("#futureContainer");
var weekForecastContainers = $("#futureContainer").children()
var day = "assets/css/style.css"
var night = "assets/css/night.css"

console.log(history);


const images  = {
Thunderstorm: {url:"./assets/images/thunderstorm.png"},
Drizzle: {url:"./assets/images/rain.png"},
Rain: {url:"./assets/images/rain.png"},
Snow: {url:"./assets/images/snow.png"},
Mist: {url:"./assets/images/mist.png"},
Clear: {url:"./assets/images/sun.png"},
Clouds: {url:"./assets/images/clouds.png"}
};


function getCoords(city) {
    var  coordinateAPIURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey
    sessionHistory.push(city)
    window.localStorage.setItem("history", JSON.stringify(sessionHistory))
    var cityHeader = $("<button>").addClass('cityHeader').text(city).on("click", function(){
        var cityInput = this.innerHTML;
        console.log(cityInput);
        getCoords(cityInput);
    })
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
$(".icon").attr("src", images[weatherData.current.weather[0].main].url);
console.log(images[weatherData.current.weather[0].main].url);
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
    weekForecastContainers.empty();

    weekForecastContainers.each(function(i) {
    var options = { weekday: 'long'};
      var day = i + 1;
      console.log(data.daily[day]);
      var date = $("<h3>").addClass("futureDate").text((new Intl.DateTimeFormat('en-US', options).format(data.daily[day].dt*1000)));
      var temp = $("<p>").addClass("futureTemp").text(data.daily[day].temp.max + "°");
      var icon = $("<img>").addClass("futureIcon icon").attr("src", images[data.daily[day].weather[0].main].url);
      var humidity = $("<p>").addClass("futureHumidity").text(data.daily[day].humidity + "% humidity");
      $(this).append(date, icon, temp, humidity);
      $(".futureIcon").show();
    })};

function UVindex() {
    var UV = $('#UV').html();
    let UVelement = $('#UV');
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

$("#lightDark").on("click", function(){
    console.log($("cssLink").href)
    if ($("#cssLink").attr('href') == day) {
    $("#cssLink").attr('href', night)
    } else {
    $("#cssLink").attr('href', day)
    }
})
function onLoad() {
        history.forEach(i => {
            var cityHeader = $("<button>").addClass('cityHeader').text(i).on("click", function(){
                var cityInput = this.innerHTML;
                console.log(cityInput);
                getCoords(cityInput);
            });
             historyStorage.prepend(cityHeader);
        })
    
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  }
function showPosition(position) {
getWeather(position.coords.latitude, position.coords.longitude);
    $("#city").text("Home");
}
}



$("#searchButton").on("click", function(){
    var cityInput = $("input").val();
    getCoords(cityInput);
       
});
$("#input").keyup(function(event) {
    if (event.keyCode === 13) {
        $("#searchButton").click();
    }
}); 

$(".cityHeader").on("click", function(){
    var cityInput = this.text;
    console.log(this);
    getCoords(cityInput);
})
$("#delete").on("click", function(){
    window.localStorage.clear();
    window.location.reload();
})
onLoad();

