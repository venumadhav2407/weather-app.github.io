// API configuration
const apiKey = "7095ece9d2c4b2f294208725e5f0acf9"; // Replace 'YOUR_API_KEY' with your actual API key
// const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${apiKey}&units=metric`;

// DOM elements
const cityElement = document.getElementById("city");
const descriptionElement = document.getElementById("description");
const temperatureElement = document.getElementById("temperature");
const humidityElement = document.getElementById("humidity");
const windSpeedElement = document.getElementById("wind-speed");

function getWeatherByCityName() {
  let cityname = document.getElementById("cityname").value;
  getWeatherData(cityname);
}

async function getWeatherData(cityname) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${apiKey}&units=metric`;

  const response = await fetch(apiUrl);
  const weatherData = await response.json();
  if (response.ok) {
    showWeatherDataOnPage(weatherData);
    document.getElementById("error").style.display = "none";
    document.getElementById("icon").style.display = "block";
  } else {
    // alert(`Error: ${response.status}`);
    clearall();
    // alert("Please enter a valid city name!");
    document.getElementById("error").innerHTML =
      "Please enter a valid city name!";
    document.getElementById("error").style.display = "block";
    document.getElementById("icon").style.display = "none";
  }
}

function showWeatherDataOnPage(weatherData) {
  console.log(weatherData);
  cityElement.innerHTML = document.getElementById("cityname").value;
  document
    .getElementById("icon")
    .setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`
    );
  descriptionElement.innerHTML = weatherData.weather[0].description;
  temperatureElement.innerHTML = weatherData.main.temp;
  humidityElement.innerHTML = weatherData.main.humidity;
  windSpeedElement.innerHTML = weatherData.wind.speed;
}

document.getElementById("cityname").addEventListener("change", () => {
  getWeatherByCityName();
});

// set time interval to update weather data every 10 minutes
// setInterval(getWeatherData, 2000);

function clearall() {
  cityElement.innerHTML = "";
  descriptionElement.innerHTML = "";
  temperatureElement.innerHTML = "";
  humidityElement.innerHTML = "";
  windSpeedElement.innerHTML = "";
  document.getElementById("icon").setAttribute("src", "");
}

// Darkmode
function darkmode() {
  const ele = document.body;
  const container = document.getElementById("main");
  const btnDarkMode = document.getElementById("sunny");
  ele.classList.toggle("dark-mode");
  container.classList.toggle("dark-container");
  btnDarkMode.classList.toggle("btn");

  // Store dark mode preference in local storage
  const isDody = ele.classList.contains("dark-mode");
  const iscontainer = container.classList.contains("dark-container");
  const isbtn = btnDarkMode.classList.contains("btn");
  localStorage.setItem("body", isDody);
  localStorage.setItem("container", iscontainer);
  localStorage.setItem("button", isbtn);
}

// Check for dark mode preference on page load
document.addEventListener("DOMContentLoaded", function () {
  if (
    localStorage.getItem("body") === "true" &&
    localStorage.getItem("container") === "true" &&
    localStorage.getItem("button") === "true"
  ) {
    document.body.classList.add("dark-mode");
    document.getElementById("main").classList.add("dark-container");
    document.getElementById("sunny").classList.add("btn");
  }
});
