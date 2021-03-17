//Created variables
let input = document.getElementById("city-input");
let todaysDate = moment().format('L');


let cityWeather = function (event){
    //Makes sure city data only is taken in
    let cityInput = input.value.trim();
    //Clears the inputed city name
    input.value = '';
    if (cityInput) {
        //Calls for the latitude and longitude fetch
        latituteLongitude(cityInput);
    } else {
        //Alert if no city is entered
        alert('Enter city');
    }
}

//This api fetch will get the latitude and longitude for me
let latituteLongitude = function (cityInput) {
    event.preventDefault();
    let latitudeLongitudeAPI = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityInput + '&units=imperial&appid=f516d162aa14db72fa44b821ca8b9bb0';
    fetch(latitudeLongitudeAPI)
        .then(function (response) {
            if (response.ok) {
            response.json().then(function (data) {
                console.log(response)
                //Calls for oneCall function which is the main weather data collector
                oneCall(data);
            });
            } else {
            alert('Error: ' + response.statusText);
            }
        })
        .catch(function (error) {
            //Alert messages if failure occurs
            alert('Cannot connect');
        });
   };

//This api fetch will get all of the weather data needed
function oneCall(data){
//These data sets from the first API fetch were made variables so they could be implemented into the main weather fetch
let longitude = data.coord.lon;
let latitude = data.coord.lat;
//See above commment
let singleCall = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + latitude + '&lon=' + longitude + '&units=imperial&exclude=hourly,minutely,alerts&appid=f516d162aa14db72fa44b821ca8b9bb0';
fetch(singleCall)
    .then(function (response) {
        if (response.ok) {
        response.json().then(function (data) {
            console.log(response)
            //Calling the currentWeather function to run
            currentWeather(data); 
            //Calling the extendedForecast function to run
            extentedForecast(data);
        });
        } else {
        alert('Error: ' + response.statusText);
        }
    })
    .catch(function (error) {
        //Alert messages if failure occurs
        alert('Cannot connect');
    });
};

//The current weather for the inputed city
let currentWeather = function (data) {
    //Creating variables for the pulled data from the fetch
    const temp = data.current.temp + '°';
    const humidity = data.current.humidity + '%';
    const windSpeed = data.current.wind_speed;
    const uvIndex = data.current.uvi;

    //Assigning the above mentioned variables to the HTML
    document.getElementById('cityHeader').innerText = todaysDate
    document.getElementById('temperature').innerText = 'Temperature: ' + temp
    document.getElementById('humidity').innerText = 'Humidity: ' + humidity
    document.getElementById('wind-speed').innerText = 'Wind Speed: ' + windSpeed
    document.getElementById('UV-index').innerText = 'UV-Index: ' + uvIndex
    console.log(temp)
    
}

//The five day extended forecast for the inputed city
let extentedForecast = function (data) {
    //Loop to input the fetched data five times
    for (let i = 1; i < 6; i++) {
        //Creating variables that include the above loop
        let uniDate = data.daily[i].dt
        let date = moment.unix(uniDate).format('M/D/YY');
        let temp = data.daily[i].temp.max + '°';
        let humidity = data.daily[i].humidity + '%';

        //Implementing the above mentioned variables into the HTML
        document.getElementsByClassName('forecast').innerText = date;
    }
} 

//JQuery event listener
$('#search-button').click(cityWeather);