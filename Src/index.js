function showTemperature(response) {
  let h1 = document.querySelector("h1");
  let temperature = Math.round(response.data.main.temp);
  h1.innerHTML = `${temperature} F°`;

  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");

  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
}

function showCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-search");
  let h4 = document.querySelector("h4");
  h4.innerHTML = `${searchInput.value}`;
  let apiKey = "7dd23c682ad66c852628ad2d2b23df92";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}&app=id${apiKey}`).then(showTemperature);
}

let citySearch = document.querySelector("#search-input");
citySearch.addEventListener("submit", showCity);

let now = new Date();
let h6 = document.querySelector("#today");
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let min = now.getMinutes();
if (min < 10) {
  min = `0${min}`;
}
let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"];
let day = days[now.getDay()];
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];
let year = now.getFullYear();
let date = now.getDate();

h6.innerHTML = `Today is ${day} the ${date}th of ${month} , ${year} at ${hour}:${min} `;

showCity("Portland");
