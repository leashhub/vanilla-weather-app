function formatDate(timestamp) {
  //calculate the date
  let date = new Date(timestamp);
  //get minutes
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  // get hours
  let hours = date.getHours();
  if (hours < 10) {
    minutes = `0${hours}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

//get  weekly forcase day (timestamp)
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[day];
}

//get each day forecast html
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="weekDays">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 7) {
      forecastHTML =
        forecastHTML +
        `
    <ul class="list-group list-group-flush" style="border-radius: 16px">
        <li class="list-group-item">
        <div class="day">
            <div class="day-text">
            <img
                src="http://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png"
                alt=""
                id="weekIcon"
            />
            ${formatDay(forecastDay.dt)}
            <br />
            </div>
            <div class="week-temp">
            <span class="max-temp">${Math.round(
              forecastDay.temp.max
            )}°</span>/<span class="min-temp"> ${Math.round(
          forecastDay.temp.min
        )}°</span>
            </div>
        </div>
        <hr />
        </li>
    </ul>
   `;
    }
  });

  forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
//get daily temps
function getForecast(coordinates) {
  let apiKey = "7dd23c682ad66c852628ad2d2b23df92";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  //get the temperature
  celsiusTemperature = response.data.main.temp;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  // get the city name
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;
  // get the description of the weather
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;
  // get the humidity
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;
  // get the wind speed
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  // get the current date
  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  //change icon
  let iconElement = document.querySelector("#main-icon");
  let iconMainElement = response.data.weather[0].icon;
  //change the placeholder image to one through APO
  iconElement.setAttribute("src", `./media/${iconMainElement}.png`);

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "7dd23c682ad66c852628ad2d2b23df92";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-search");
  search(cityInputElement.value);
}

function showFahrenheitTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  // remove the active class from the celsius link
  cLink.classList.remove("active");
  //add active class to fahrenheit link
  fLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;

  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function showCelsiusTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");

  // remove the active class from the fahrenheit link
  fLink.classList.remove("active");
  //add active class to celsius link
  cLink.classList.add("active");
  temperatureElement.innerHTML = `${Math.round(celsiusTemperature)} °`;
}

let celsiusTemperature = null;

let form = document.querySelector("#search-input");
form.addEventListener("submit", handleSubmit);

let fLink = document.querySelector("#f-link");
fLink.addEventListener("click", showFahrenheitTemp);

let cLink = document.querySelector("#c-link");
cLink.addEventListener("click", showCelsiusTemp);

search("Portland");
