
function formatDate (timestamp){
let date = new Date(timestamp);
let hours = date.getHours();
if (hours < 10){
  hours =`0${hours}`;
}
let minutes = date.getMinutes();
if (minutes < 10){
  minutes =`0${minutes}`;
}
let days =["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let months =["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
let month=months[date.getMonth()];
let day = days[date.getDay()];
let dayMonth =date.getDate();
return `Last update, ${day} ${month} ${dayMonth} at ${hours}:${minutes}</p>`;
}

function formatDay (timestamp){
let date = new Date(timestamp * 1000);
let day = date.getDay();
let days =["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

return days[day];
}

function displayForecast(response){
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

   let forecastHTML=`<div class="row">`;
   forecast.forEach(function(forecastDay, index){
     if (index < 6) {
      forecastHTML = forecastHTML +
   ` <div class="col-2 bord">
              <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
              <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" class="fas fa-cloud prevision" alt="" width="42"/>
              <div class="weather-forecast-temperatures">
                <span class="weather-forecast-temperature-max">${Math.round(forecastDay.temp.max)}°</span>
                <span class="weather-forecast-temperature-min">${Math.round(forecastDay.temp.min)}°</span>
              </div>
            </div>
            `;
            }
  });

  forecastHTML= forecastHTML + `</div>`;
  forecastElement.innerHTML=forecastHTML;
}

function getForecast(coordinates) {
let apiKey = "6ec780629b6faed9d539966bf949a6fb";
let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
 axios.get(apiUrl).then(displayForecast);
}

function displayTemperature (response) {
  let temperatureElement=document.querySelector("#temperature-change");
  let cityElement=document.querySelector("#place-weather");
  let descriptionElement=document.querySelector("#description");
  let humidityElement=document.querySelector("#humidity");
  let windElement=document.querySelector("#wind");
  let dateElement=document.querySelector("#date-information");
  let iconElement=document.querySelector("#icon");
  celsiusTemperature=response.data.main.temp;

  temperatureElement.innerHTML=Math.round(response.data.main.temp);
  cityElement.innerHTML=response.data.name;
  descriptionElement.innerHTML=response.data.weather[0].description;
  humidityElement.innerHTML=response.data.main.humidity;
  windElement.innerHTML=Math.round(response.data.wind.speed);
  dateElement.innerHTML= formatDate(response.data.dt * 1000);
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function search(city){
  let apiKey = "6ec780629b6faed9d539966bf949a6fb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event){
  event.preventDefault();
  let cityInputElement=document.querySelector("#city-input");
  search(cityInputElement.value);
}

function displayFahrenheitTemp(event){
  event.preventDefault();
  let temperatureElement=document.querySelector("#temperature-change");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let fahrenheiTemperature = (celsiusTemperature -32) * 5/9;
  temperatureElement.innerHTML =Math.round(fahrenheiTemperature);
}

function displayCelsiusTemp(event){
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement=document.querySelector("#temperature-change");
  temperatureElement.innerHTML=Math.round(celsiusTemperature);
}

let celsiusTemperature =null;
let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemp);

search("Madrid");

//id="#weather-forecast-temperatures"
//id="#
//id="# https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
// let weekDays =["Sat", "Sun", "Mon", "Tue", "Wed"];