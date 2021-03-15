
var apiKey = "f80bb50772c40a878ed5746b10181c83";
var oneCallAPIURL = "https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid=" + apiKey;
console.log(oneCallAPIURL);
var cityInput = $("input").val();
var  coordinateAPIURL = "https://api.openweathermap.org/data/2.5/weather?q=Detroit&appid=" + apiKey

fetch (coordinateAPIURL)
.then(function (response) {
    // return response.json();
    console.log(response);
});

var history = [] || JSON.parse(localStorage.getItem("history"));
var search = [];

$("button.searchButton").on("click", function(event){
    search.push(cityInput);
    GeolocationCoordinates
}); 


for (let i = 0; i < search.length; i++) {
  history.push( {
      cityName: search[i],
      lat: "",
      lon: "",
})};

// $(history).each(function() {
// something to add coordinates into history
// });