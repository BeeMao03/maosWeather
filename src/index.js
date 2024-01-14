const apiKey = "t8be874ao00e969ec72593d742ee985f";

async function refreshWeather(responseCity) {
  let temperatureElement = document.querySelector("#current_temperature_value");
  let currentTemperature = Math.round(responseCity.data.temperature.current);
  let cityElement = document.querySelector("#main_city");
  let descriptionElement = document.querySelector("#currentDescription");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#windSpeed");
  let pressureElement = document.querySelector("#pressure");
  let feelsLikeElement = document.querySelector("#feels_like_temperature");
  let timeElement = document.querySelector("#current_time");
  let date = new Date(responseCity.data.time * 1000);
  let lon = responseCity.data.coordinates.longitude;
  let lat = responseCity.data.coordinates.latitude;

  // Call the other API
  let apiForecastUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${lon}&lat=${lat}&key=${apiKey}`;
  let responseForecast = await axios.get(apiForecastUrl);

  //Forecast
  let highTemperatureElement = document.querySelector("#high_temperature");

  //City
  temperatureElement.innerHTML = currentTemperature;
  cityElement.innerHTML = responseCity.data.city;
  descriptionElement.innerHTML = responseCity.data.condition.description;
  humidityElement.innerHTML = responseCity.data.temperature.humidity;
  windSpeedElement.innerHTML = responseCity.data.wind.speed;
  pressureElement.innerHTML = responseCity.data.temperature.pressure;
  feelsLikeElement.innerHTML = Math.round(
    responseCity.data.temperature.feels_like
  );
  timeElement.innerHTML = formatDate(date);
}

function formatDate(date) {
  let dayNumber = date.getDay();
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayNumber];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    hours = `0${hours}`;
  }

  return `${day}, ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(refreshWeather);
}

function searchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search_input");

  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search_form");
searchFormElement.addEventListener("submit", searchSubmit);

searchCity("Asunción");
