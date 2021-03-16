function start() {
    const key = "f516d162aa14db72fa44b821ca8b9bb0";
    const history = document.getElementById("history");
    const searchButton = document.getElementById("searchButton");
    const cityInput = document.getElementById("cityInput");
    const nameOfCity = document.getElementById("cityName");
    const currentImage = document.getElementById("currentImage");
    const temperature = document.getElementById("temperature");
    const humidity = document.getElementById("humidity");
    const windSpeed = document.getElementById("windSpeed");
    const uvIndex = document.getElementById("uvIndex");
    let searchHistory = JSON.parse(localStorage.getItem("search")) || [];

    function weather(cityName) {
        let requestUrl = 'api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=' + key;
        fetch(requestUrl)
          .then(function (response) {
            console.log(response)
            const currentDate = new Date(response.data.dt*1000);
            console.log(currentDate);
            const day = currentDate.getDate();
            const month = currentDate.getMonth() + 1;
            const year = currentDate.getFullYear();
            nameOfCity.innerHTML = response.data.name + " (" + month + "/" + day + "/" + year + ") ";
            let weatherPic = response.data.weather[0].icon;
            currentImage.setAttribute("src","https://openweathermap.org/img/wn/" + weatherPic + "@2x.png");
            currentImage.setAttribute("alt",response.data.weather[0].description);
            temperature.innerHTML = "Temperature: " + k2f(response.data.main.temp) + " &#176F";
            humidity.innerHTML = "Humidity: " + response.data.main.humidity + "%";
            windSpeed.innerHTML = "Wind Speed: " + response.data.wind.speed + " MPH";
        
        let lat = response.data.coord.lat;
        let lon = response.data.coord.lon;
        let uvURL = "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + key + "&cnt=1";
        fetch(uvURL)
        .then(function (response) {
            let UVIndex = document.createElement("span");
            UVIndex.setAttribute("class","badge badge-danger");
            UVIndex.innerHTML = response.data[0].value;
            uvIndex.innerHTML = "UV Index: ";
            uvIndex.append(UVIndex);
        });
    }

    searchButton.addEventListener("click",function() {
        const searchTerm = cityInput.value;
        weather(searchTerm);
        searchHistory.push(searchTerm);
        localStorage.setItem("search",JSON.stringify(searchHistory));
        renderSearchHistory();
    })

    function renderSearchHistory() {
        history.innerHTML = "";
        for (let i=0; i<searchHistory.length; i++) {
            const historyItem = document.createElement("input");
            historyItem.setAttribute("type","text");
            historyItem.setAttribute("readonly",true);
            historyItem.setAttribute("class", "form-control d-block bg-white");
            historyItem.setAttribute("value", searchHistory[i]);
            historyItem.addEventListener("click",function() {
                weather(historyItem.value);
            })
            history.append(historyItem);
        }
    }

    renderSearchHistory();
    if (searchHistory.length > 0) {
        getWeather(searchHistory[searchHistory.length - 1]);
    }
}

start();