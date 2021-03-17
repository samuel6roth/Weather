let key = "f516d162aa14db72fa44b821ca8b9bb0";
let input = document.getElementById("city-input");
//let cityHeader = document.getElementById("cityHeader");
let currentImage = document.getElementById("current-pic");
let temperature = document.getElementById("temperature");
let humidity = document.getElementById("humidity");
let windSpeed = document.getElementById("wind-speed");
let uvIndex = document.getElementById("UV-index");
// let searchHistory = JSON.parse(localStorage.getItem("search")) || [];

// $('#city-input').on('keypress', cityWeather());

let cityWeather = function (event){
    let cityInput = input.value.trim();
    input.value = '';
    if (cityInput) {
        latituteLongitude(cityInput);
    } else {
        alert('Enter city');
    }
}

let latituteLongitude = function (cityInput) {
    event.preventDefault();
    let latitudeLongitudeAPI = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityInput + '&units=imperial&appid=f516d162aa14db72fa44b821ca8b9bb0';
    fetch(latitudeLongitudeAPI)
        .then(function (response) {
            if (response.ok) {
            response.json().then(function (data) {
                console.log(response)
                oneCall(data);
            });
            } else {
            alert('Error: ' + response.statusText);
            }
        })
        .catch(function (error) {
            alert('Cannot connect');
        });
   };

function oneCall(data){
let longitude = data.coord.lon;
let latitude = data.coord.lat;
let singleCall = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + latitude + '&lon=' + longitude + '&units=imperial&exclude=hourly,minutely,alerts&appid=f516d162aa14db72fa44b821ca8b9bb0';
fetch(singleCall)
    .then(function (response) {
        if (response.ok) {
        response.json().then(function (data) {
        });
        } else {
        alert('Error: ' + response.statusText);
        }
    })
    .catch(function (error) {
        alert('Cannot connect');
    });
};



//$('#city-input').on('keypress', cityWeather)
$('#search-button').click(cityWeather);