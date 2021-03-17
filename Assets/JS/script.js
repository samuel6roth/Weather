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
    let cityInput = input.nodeValue.trim();
    input.value = '';
    if (cityInput) {
        getLatLon(cityInput);
    } else {
        alert('Enter city');
    }
}

let getLatLon = function (cityInput) {
    event.preventDefault();
    let apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityInput + '&units=imperial&appid=f516d162aa14db72fa44b821ca8b9bb0';
    $('.removeMe').remove();
    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
            response.json().then(function (data) {
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

$('#search-button').click(cityWeather);