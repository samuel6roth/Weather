//let key = "f516d162aa14db72fa44b821ca8b9bb0";
let input = document.getElementById("city-input");
//let cityHeader = document.getElementById("cityHeader");
//let currentImage = document.getElementById("current-pic");
//let temperature = document.getElementById("temperature");
//let humidity = document.getElementById("humidity");
//let windSpeed = document.getElementById("wind-speed");
//let uvIndex = document.getElementById("UV-index");
//let desc = document.getElementsByClassName("no-show")
let todaysDate = moment().format('L');


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
            console.log(response)
            currentWeather(data); 
            extentedForecast(data);
        });
        } else {
        alert('Error: ' + response.statusText);
        }
    })
    .catch(function (error) {
        alert('Cannot connect');
    });
};

let currentWeather = function (data) {
    const temp = data.current.temp + '°';
    const humidity = data.current.humidity + '%';
    const windSpeed = data.current.wind_speed;
    const uvIndex = data.current.uvi;

    document.getElementById('cityHeader').innerText = todaysDate
    document.getElementById('temperature').innerText = 'Temperature: ' + temp
    document.getElementById('humidity').innerText = 'Humidity: ' + humidity
    document.getElementById('wind-speed').innerText = 'Wind Speed: ' + windSpeed
    document.getElementById('UV-index').innerText = 'UV-Index: ' + uvIndex
    console.log(temp)
    
}

let extentedForecast = function (data) {
    for (let i = 1; i < 6; i++) {
        let uniDate = data.daily[i].dt
        let date = moment.unix(uniDate).format('M/D/YY');
        let temp = data.daily[i].temp.max + '°';
        let humidity = data.daily[i].humidity + '%';

        document.getElementsByClassName('forecast').innerText = date;
    }
} 


$('#search-button').click(cityWeather);