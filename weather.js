const API_KEY = "e6e7d47d27edcf1f386cf94352b964ac";

let isFahrenheit = true;
const blackImgLink =
  "https://imageio.forbes.com/specials-images/imageserve/5ed6636cdd5d320006caf841/The-Blackout-Tuesday-movement-is-causing-Instagram-feeds-to-turn-black-/960x0.jpg?format=jpg&width=960";

let searchLocation = "";

const getWeather = async (location) => {
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=${API_KEY}`;
  if (!isFahrenheit) apiURL += "&units=metric";

  const response = await fetch(apiURL, { mode: "cors" });

  const weatherData = await response.json();

  try {
    const weatherMain = weatherData.weather[0].main;
    const weatherDescription = weatherData.weather[0].description;
    const weatherIcon = weatherData.weather[0].icon;

    const temp = weatherData.main.temp;
    const humidity = weatherData.main.humidity;
    const windSpeed = weatherData.wind.speed;

    return [
      weatherMain,
      weatherDescription,
      weatherIcon,
      temp,
      humidity,
      windSpeed,
    ];
  } catch (err) {
    alert("No such city!");
  }
};

const parseCityInput = (event) => {
  event.preventDefault();
  return event.target[0].value;
};

const updateDOM = (weatherData) => {
  [weatherMain, weatherDescription, weatherIcon, temp, humidity, windSpeed] =
    weatherData;

  const weatherImgDiv = document.getElementById("weather-img");
  weatherImgDiv.src = `http://openweathermap.org/img/wn/${weatherIcon}@4x.png`;

  const displayWeatherMain = document.getElementById("weather-main");
  displayWeatherMain.innerText = weatherMain + ", ";

  const displayWeatherDesc = document.getElementById("weather-description");
  displayWeatherDesc.innerText = weatherDescription;

  const tempDiv = document.querySelector(".temp");
  const tempUnit = isFahrenheit ? "°F" : "°C";
  tempDiv.innerText = `🌡️ Temperature: ${temp}${tempUnit}`;

  const humidityDiv = document.querySelector(".humidity");
  humidityDiv.innerText = `💦 Humidity: ${humidity}%`;

  const windSpeedDiv = document.querySelector(".wind");
  windSpeedDiv.innerText = `💨 Wind speed: ${windSpeed} m/s`;
};

const handleInput = async (event) => {
  searchLocation = parseCityInput(event);
  try {
    const weatherData = await getWeather(searchLocation);
    updateDOM(weatherData);
  } catch (err) {
    console.log(err);
  }
};

const form = document.getElementById("location-form");
form.addEventListener("submit", handleInput);

const toggleDegreeUnit = () => {
  isFahrenheit = !isFahrenheit;
};

const handleToggleDegreeUnit = async () => {
  toggleDegreeUnit();

  if (searchLocation !== "") {
    const weatherData = await getWeather(searchLocation);
    updateDOM(weatherData);
  }
};

const toggleDegreeUnitBtn = document.querySelector(".checkbox");
toggleDegreeUnitBtn.addEventListener("click", handleToggleDegreeUnit);
