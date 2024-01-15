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
  let iconElement = document.querySelector("#icon");
  let date = new Date(responseCity.data.time * 1000);
  let lon = responseCity.data.coordinates.longitude;
  let lat = responseCity.data.coordinates.latitude;

  // Call the other API
  let apiForecastUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${lon}&lat=${lat}&key=${apiKey}`;
  let responseForecast = await axios.get(apiForecastUrl);
  console.log(responseForecast);

  //Forecast
  let highTemperatureElement = document.querySelector("#high_temperature");
  let lowTemperatureElement = document.querySelector("#low_temperature");

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
  iconElement.innerHTML = `<img src="${responseCity.data.condition.icon_url}" class="current_temperature_icon" />`;
  highTemperatureElement.innerHTML = Math.round(
    responseForecast.data.daily[date.getDay()].temperature.maximum
  );
  lowTemperatureElement.innerHTML = Math.round(
    responseForecast.data.daily[date.getDay()].temperature.minimum
  );

  let pageTheme = updatePageTheme(currentTemperature);
  updateElementClasses(pageTheme);
}

function updateElementClasses(pageTheme) {
  let regex = /-(.*)/;
  let bodyElement = document.querySelector("#backgroundBody");
  bodyElement.className = bodyElement.className.replace(regex, `-${pageTheme}`);
  let bgElement = document.querySelector("#mainBG");
  bgElement.className = bgElement.className.replace(regex, `-${pageTheme}`);
  for (let i = 1; i <= 3; i++) {
    let linkElement = document.getElementById(`link${i}`);
    linkElement.className = linkElement.className.replace(
      regex,
      `-${pageTheme}`
    );
  }
  let headerElement = document.querySelector("#mainHeader");
  headerElement.className = headerElement.className.replace(
    regex,
    `-${pageTheme}`
  );
  let footerElement = document.querySelector("#mainFooter");
  footerElement.className = footerElement.className.replace(
    regex,
    `-${pageTheme}`
  );
  let inputElement = document.querySelector("#search_input");
  inputElement.className = inputElement.className.replace(
    regex,
    `-${pageTheme}`
  );
  let searchButtonElement = document.querySelector("#search_button");
  searchButtonElement.className = searchButtonElement.className.replace(
    regex,
    `-${[pageTheme]}`
  );
  let unitButtonElement = document.querySelector("#unitButton");
  unitButtonElement.className = unitButtonElement.className.replace(
    regex,
    `-${pageTheme}`
  );
  for (let i = 1; i <= 5; i++) {
    let strongElement = document.getElementById(`strongElement${i}`);
    strongElement.className = strongElement.className.replace(
      regex,
      `-${pageTheme}`
    );
  }
}

function updatePageTheme(currentTemperature) {
  let className;
  if (currentTemperature < 15) {
    className = "cool";
  } else if (currentTemperature > 25) {
    className = "warm";
  } else {
    className = "spring";
  }
  return className;
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
