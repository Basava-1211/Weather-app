const apiKey = "b1fdb33bda6f287f9dc46c9a7fe1e72b"; // Your API key

async function getWeather(defaultCity = null) {
  const city = defaultCity || document.getElementById("cityInput").value;
  if (!city) return;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === 200) {
      document.getElementById("cityName").innerText = data.name;
      document.getElementById("temperature").innerText = `Temperature: ${data.main.temp} °C`;
      document.getElementById("condition").innerText = `Condition: ${data.weather[0].description}`;
      document.getElementById("humidity").innerText = `Humidity: ${data.main.humidity}%`;
      document.getElementById("wind").innerText = `Wind Speed: ${data.wind.speed} m/s`;

      const iconCode = data.weather[0].icon;
      document.getElementById("icon").src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    } else {
      document.getElementById("cityName").innerText = "City not found!";
      document.getElementById("temperature").innerText = "";
      document.getElementById("condition").innerText = "";
      document.getElementById("humidity").innerText = "";
      document.getElementById("wind").innerText = "";
      document.getElementById("icon").src = "";
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

// Load default city on page start
window.onload = () => {
  getWeather("Kalaburagi");
};
