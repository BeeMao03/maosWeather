function refreshWeather(response) {
  let temperatureElement = document.querySelector("#current_temperature_value");
  let currentTemperature = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector("#main_city");

  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = currentTemperature;
}

function searchCity(city) {
  let apiKey = "t8be874ao00e969ec72593d742ee985f";
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
