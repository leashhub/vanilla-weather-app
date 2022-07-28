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

  // get day with array
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function displayTemperature(response) {
  //get the temperature
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

  celsiusTemperature = response.data.main.temp;
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

function showFahrenheightTemp(event) {
  event.preventDefault();
  let fahrenheightTemperature = (celsiusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheightTemperature);
}

function showCelsiusTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-input");
form.addEventListener("submit", handleSubmit);

let fLink = document.querySelector("#f-link");
fLink.addEventListener("click", showFahrenheightTemp);

let cLink = document.querySelector("#c-link");
cLink.addEventListener("click", showCelsiusTemp);

search("New York");
