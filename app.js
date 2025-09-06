// // Select elements
const searchInput = document.querySelector(".search-bar input");
const searchBtn = document.querySelector(".search-bar i");
const tempUpdate = document.querySelector(".temp-update");
const cityName = document.querySelector(".city-name");
const humidityUpdate = document.querySelector(".humidity-update");
const windUpdate = document.querySelector(".wind-update");
const weatherImg = document.querySelector(".weather-condition img");

// API key and base URL
const apiKey = "c80cb47fa2e2c31a2bdb79400980813e";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

// Fetch weather function
async function getWeather(city) {
  try {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    if (!response.ok) {
      throw new Error("City not found");
    }

    let data = await response.json();

    // Update UI
    cityName.innerText = data.name;
    tempUpdate.innerText = Math.round(data.main.temp) + "°C";
    humidityUpdate.innerText = data.main.humidity + "%";
    windUpdate.innerText = data.wind.speed + " km/h";

    // Update image based on weather
    switch (data.weather[0].main) {
      case "Clear":
        weatherImg.src = "images/clear.png";
        break;
      case "Clouds":
        weatherImg.src = "images/clouds.png";
        break;
      case "Rain":
        weatherImg.src = "images/rain.png";
        break;
      case "Drizzle":
        weatherImg.src = "images/drizzle.png";
        break;
      case "Snow":
        weatherImg.src = "images/snow.png";
        break;
      case "Mist":
      case "Haze":
      case "Fog":
        weatherImg.src = "images/mist.png";
        break;
      default:
        weatherImg.src = "images/clear.png";
    }
  } catch (error) {
    cityName.innerText = "City not found";
    tempUpdate.innerText = "--°C";
    humidityUpdate.innerText = "--%";
    windUpdate.innerText = "-- km/h";
    weatherImg.src = "images/error.jpg"; // You can add an error.png image
  }
}

// Search on button click
searchBtn.addEventListener("click", () => {
  getWeather(searchInput.value);
});

// Search on pressing Enter
searchInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    getWeather(searchInput.value);
  }
});
