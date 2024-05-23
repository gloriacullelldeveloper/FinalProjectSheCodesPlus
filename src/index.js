function refreshWeather(response) {
    
    let temperatureElement = document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#city");
    let city = response.data.city;
    let descriptionElement = document.querySelector("#description");
    let description = response.data.condition.description;
    let humidityElement = document.querySelector("#humidity");
    let humidity = response.data.temperature.humidity;
    let windSpeedElement = document.querySelector("#wind-speed");
    let windSpeed = response.data.wind.speed;
    let timeElement = document.querySelector("#time");
    let date = new Date(response.data.time * 1000);
    let iconElement = document.querySelector("#icon");

    cityElement.innerHTML = city;
    temperatureElement.innerHTML = Math.round(temperature);
    descriptionElement.innerHTML = description;
    humidityElement.innerHTML = humidity + "%";
    windSpeedElement.innerHTML = windSpeed + "km/h";
    timeElement.innerHTML = formatDate(date);
    iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="current-temperature-icon" />`;
    
    getForecast(response.data.city);
    
}
 
function formatDate(date) {

    
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];
    let day = days[date.getDay()];

    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    if (hours < 10) {
        hours = `0${hours}`;
    }
 
    return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {

    let apiKey = "c71c7bae8f4otf0ad66fa62c747c8831";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    
    axios.get(apiUrl).then(refreshWeather);

}

function handleSearchSubmit(event) {


    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");
    searchCity(searchInput.value);
 
}

function formatDay(timestamp) {
    
    let date = new Date(timestamp * 1000);
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return days[date.getDay()];
}

function getForecast(city) {

    let apiKey = "c71c7bae8f4otf0ad66fa62c747c8831";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeather);

}

function displayWeather(response) {

    let forecastHtml = "";

    response.data.daily.forEach(function (day, index) {
        if (index < 5) {

            forecastHtml = forecastHtml + ` 
        <div class="weather-forecast">
              <div class="row">
                <div class="weather-forecast-date">${formatDay(day.time)}</div>
                <img src="${day.condition.icon_url}" class="weather-forecast-icon" />
                <div class="weather-forecast-temperature">
                   <span class="weather-forecast-temperature-max"><strong>${Math.round(day.temperature.maximum)}º</strong></span> 
                   <span class="weather-forecast-temperature-min">${Math.round(day.temperature.minimum)}º</span>
                </div>  
              </div>
         </div>`;
        }
    });

      
    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Paris");





