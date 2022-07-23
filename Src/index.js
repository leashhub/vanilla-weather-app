function formatDate(timestamp) {
  //calculate the date
  let date = new Date(timestamp);
  // get hours
  let hours = date.getHours();
  if (hours > 10) {
    minutes = `0${hours}`;
  }
  //get minutes
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  // get day with array
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function displayTemperature(response) {
  console.log(response.data);
  //get the temperature
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
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
}

let apiKey = "7dd23c682ad66c852628ad2d2b23df92";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=New York&appid=${apiKey}&units=imperial`;
console.log(apiUrl);
axios.get(apiUrl).then(displayTemperature);
