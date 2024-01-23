const apiKey = "t8be874ao00e969ec72593d742ee985f";
let units = "metric";

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
  let apiForecastUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${lon}&lat=${lat}&key=${apiKey}&units=${units}`;
  let responseForecast = await axios.get(apiForecastUrl);
  displayForecast(responseForecast, date.getDay());

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

  if (units === "metric") {
    let mainUnitNow = document.querySelector("#currentTemperatureUnit");
    let secondaryUnitNow = document.querySelector(
      "#currentTemperatureUnitSecundary"
    );
    let windUnitNow = document.querySelector("#speedUnit");

    mainUnitNow.innerHTML = "°C";
    secondaryUnitNow.innerHTML = "°C";
    windUnitNow.innerHTML = "km/";
  }

  document.querySelector("#unitButton").innerHTML = "Imperial Units";
  document.querySelector("#unitButton").onclick = changeUnitsToImperial;

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
  for (let i = 0; i < 5; i++) {
    let maxTempElement = document.querySelector(
      `#forecast_temperature_max_${i}`
    );
    let minTempElement = document.querySelector(
      `#forecast_temperature_min_${i}`
    );
    maxTempElement.className = maxTempElement.className.replace(
      regex,
      `-${pageTheme}`
    );
    minTempElement.className = minTempElement.className.replace(
      regex,
      `-${pageTheme}`
    );
  }
}

function updatePageTheme(currentTemperature) {
  let className;
  if (currentTemperature < 20) {
    className = "cool";
  } else if (currentTemperature > 29) {
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
  units = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(refreshWeather);
}

function searchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search_input");

  searchCity(searchInput.value);
}

function changeUnitsToImperial() {
  if (units === "imperial") {
    return;
  }
  //Define elements
  let temperatureNowElement = document.querySelector(
    "#current_temperature_value"
  );
  let temperatureFeelsNow = document.querySelector("#feels_like_temperature");
  let temperatureNowHigh = document.querySelector("#high_temperature");
  let temperatureNowLow = document.querySelector("#low_temperature");
  let windSpeedNow = document.querySelector("#windSpeed");
  let mainUnitNow = document.querySelector("#currentTemperatureUnit");
  let secondaryUnitNow = document.querySelector(
    "#currentTemperatureUnitSecundary"
  );
  let windUnitNow = document.querySelector("#speedUnit");

  //Change to imperial values
  let temperatureNowFarenheit = Math.round(
    (temperatureNowElement.innerHTML * 9) / 5 + 32
  );
  let temperatureFeelsFarenheit = Math.round(
    (temperatureFeelsNow.innerHTML * 9) / 5 + 32
  );
  let temperatureHighFarenheit = Math.round(
    (temperatureNowHigh.innerHTML * 9) / 5 + 32
  );
  let temperatureLowFarenheit = Math.round(
    (temperatureNowLow.innerHTML * 9) / 5 + 32
  );
  let windSpeedImperial = (windSpeedNow.innerHTML / 1.609).toFixed(2);

  //Change display
  temperatureNowElement.innerHTML = temperatureNowFarenheit;
  temperatureFeelsNow.innerHTML = temperatureFeelsFarenheit;
  temperatureNowHigh.innerHTML = temperatureHighFarenheit;
  temperatureNowLow.innerHTML = temperatureLowFarenheit;
  windSpeedNow.innerHTML = windSpeedImperial;
  mainUnitNow.innerHTML = "°F";
  secondaryUnitNow.innerHTML = "°F";
  windUnitNow.innerHTML = "mp";

  //Forecast
  for (let i = 0; i < 5; i++) {
    let maxTempElement = document.querySelector(
      `#forecast_temperature_max_${i}`
    );
    let minTempElement = document.querySelector(
      `#forecast_temperature_min_${i}`
    );
    console.log(maxTempElement.innerHTML);

    let maxTempFarenheit = Math.round((maxTempElement.innerHTML * 9) / 5 + 32);
    let minTempFarenheit = Math.round((minTempElement.innerHTML * 9) / 5 + 32);

    //change

    maxTempElement.innerHTML = maxTempFarenheit;
    minTempElement.innerHTML = minTempFarenheit;
  }

  units = "imperial";
  document.querySelector("#unitButton").innerHTML = "Metric Units";
  document.querySelector("#unitButton").onclick = changeUnitsToMetric;
}

function changeUnitsToMetric() {
  if (units === "metric") {
    return;
  }

  let temperatureNowElement = document.querySelector(
    "#current_temperature_value"
  );
  let temperatureFeelsNow = document.querySelector("#feels_like_temperature");
  let temperatureNowHigh = document.querySelector("#high_temperature");
  let temperatureNowLow = document.querySelector("#low_temperature");
  let windSpeedNow = document.querySelector("#windSpeed");
  let mainUnitNow = document.querySelector("#currentTemperatureUnit");
  let secondaryUnitNow = document.querySelector(
    "#currentTemperatureUnitSecundary"
  );
  let windUnitNow = document.querySelector("#speedUnit");

  //Change to metric values
  let temperatureNowCelsius = Math.round(
    ((temperatureNowElement.innerHTML - 32) * 5) / 9
  );
  let temperatureFeelsCelsius = Math.round(
    ((temperatureFeelsNow.innerHTML - 32) * 5) / 9
  );
  let temperatureHighCelsius = Math.round(
    ((temperatureNowHigh.innerHTML - 32) * 5) / 9
  );
  let temperatureLowCelsius = Math.round(
    ((temperatureNowLow.innerHTML - 32) * 5) / 9
  );
  let windSpeedMetric = (windSpeedNow.innerHTML * 1.609).toFixed(2);

  //Change display
  temperatureNowElement.innerHTML = temperatureNowCelsius;
  temperatureFeelsNow.innerHTML = temperatureFeelsCelsius;
  temperatureNowHigh.innerHTML = temperatureHighCelsius;
  temperatureNowLow.innerHTML = temperatureLowCelsius;
  windSpeedNow.innerHTML = windSpeedMetric;
  mainUnitNow.innerHTML = "°C";
  secondaryUnitNow.innerHTML = "°C";
  windUnitNow.innerHTML = "km/";

  for (let i = 0; i < 5; i++) {
    let maxTempElement = document.querySelector(
      `#forecast_temperature_max_${i}`
    );
    let minTempElement = document.querySelector(
      `#forecast_temperature_min_${i}`
    );
    console.log(maxTempElement.innerHTML);

    let maxTempCelsius = Math.round(((maxTempElement.innerHTML - 32) * 5) / 9);
    let minTempCelsius = Math.round(((minTempElement.innerHTML - 32) * 5) / 9);

    //change

    maxTempElement.innerHTML = maxTempCelsius;
    minTempElement.innerHTML = minTempCelsius;
  }

  units = "metric";
  document.querySelector("#unitButton").innerHTML = "Imperial Units";
  document.querySelector("#unitButton").onclick = changeUnitsToImperial;
}

// FORECAST

function displayForecast(responseForecast, today) {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = "";
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  console.log(responseForecast);
  let currentDay = today;

  for (let i = 0; i < 5; i++) {
    if (currentDay > 6) {
      currentDay = 0;
    }
    let day = responseForecast.data.daily[currentDay];
    console.log(day);
    forecastHTML =
      forecastHTML +
      `
  <div class="weather-forecast-day">
    <div class="weather-forecast-date">${days[currentDay]}</div>
    <div ><img src="${
      day.condition.icon_url
    }" class="weather-forecast-icon" /></div>
    <div class="weather-forecast-temperatures">
      <strong class="strong-warm" id="forecastElement${i}">
        <span class="max_temperature" id="forecast_temperature_max_${i}">${Math.round(
        day.temperature.maximum
      )}</span>°
      </strong>
      <span class="strong-warm" id="forecastElement${i}">
        <span class="min_temperature" id="forecast_temperature_min_${i}">${Math.round(
        day.temperature.minimum
      )}</span>°
      </span>
    </div>
  </div>
`;
    currentDay++;
  }

  forecastElement.innerHTML = forecastHTML;
}

let searchFormElement = document.querySelector("#search_form");
searchFormElement.addEventListener("submit", searchSubmit);
searchCity("Asunción");
