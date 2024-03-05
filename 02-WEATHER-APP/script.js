const apiKey = '26faf7c141a05f12bd3f6cf3553f8dd1';
const defaultCity = 'allahabad';
const forecastLink = document.getElementById('forecastLink');
const searchbox = document.querySelector("input");

document.addEventListener('DOMContentLoaded', () => {
    defaultweather(defaultCity);
});

function defaultweather() {
    const storedData = localStorage.getItem(defaultCity);
    if (storedData) {
      const data = JSON.parse(storedData);
      displayWeather(data);
    } else {
      getWeather(defaultCity);
    }
  }
  
function searchWeather() {
    const cityInput = document.getElementById('cityInput');
    const city = cityInput.value.toLowerCase();

    const url = "weather.php?city=" + encodeURIComponent(city);
    // Update the href attribute of the forecast link
     forecastLink.href = url;

    // Check if weather data for the city is available in local storage
    const storedData = localStorage.getItem(city);
    if (storedData) {
      // If data is available, parse and display it
      const data = JSON.parse(storedData);
      console.log("data received from local storage");
      console.log(data);
      displayWeather(data);
    } else {
      // If data is not available, fetch it from the server
      getWeather(city);
    }
  }
  

function getWeather(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    console.log("got into api section , meaning featching from the api");
    fetch(apiUrl)
        .then(response => {
            if (!response.ok){
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.cod && data.message){
                throw new Error (`OpenWeatherMap API error: ${data.message}`);
            }
            saveWeatherToLocal(city, data);
            insertWeatherData(data);
            displayWeather(data);
           
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            displayErrorMessage('CITY NOT FOUND!');
        });
}

function displayErrorMessage(message) {
    const weatherInfo = document.getElementById('weatherInfo');
    weatherInfo.innerHTML = `<p>${message}</p>`;
}

function displayWeather(data) {
    const weatherInfo = document.getElementById('weatherInfo');
    const city = data.name|| data[0]?.name|| 'Unknown';
    const country = data.sys?.country || (data[0]?.sys?.country || 'Unknown');
    const weatherDescription = data.weather?.[0]?.description || data[0]?.weather?.[0]?.description || 'Unknown';
    const temperature = data.main?.temp || data[0]?.main?.temp || 'Unknown';
    const pressure = data.main?.pressure || data[0]?.main?.pressure || 'Unknown';
    const windSpeed = data.wind?.speed || data[0]?.wind?.speed || 'Unknown';
    const humidity = data.main?.humidity ||data[0]?.main?.humidity || 'Unknown';
    const weathericon = data.weather?.[0]?.icon || data[0]?.weather?.[0]?.icon || 'Unknown';

    weatherInfo.style.color = "#00468B";
    weatherInfo.innerHTML = `
        <h2>${city}, ${country}</h2>
        <p>${new Date().toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })}</p>
        <p>Weather Condition: ${weatherDescription}</p>
        <img src="http://openweathermap.org/img/wn/${weathericon}.png" alt="Weather Icon" class="icon">
        <p><i class="fa-solid fa-temperature-high"></i> Temperature: ${temperature}°C</p>
        <p><i class="fa-solid fa-water"></i> Pressure: ${pressure} hPa</p>
        <p><i class="fa-solid fa-wind"></i> Wind Speed: ${windSpeed} m/s</p>
        <p><i class="fa-solid fa-droplet"></i> Humidity: ${humidity}%</p>
    `;
}

// const options = {year: 'numeric', month: 'numeric', day: 'numeric' };
// const date = new Date().toLocaleDateString('en-US', options);
// console.log(date); 


function insertWeatherData(data) {
   
    const url = "weather.php?city=" + encodeURIComponent(data.name);
    forecastLink.href = url;
    console.log("weather.php has been called!");
    console.log(data.name);

    const insertApiUrl = 'insert_weather_data.php'; // Replace with the correct server-side script URL

    fetch(insertApiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            // date: new Date().toLocaleString('en-US', { timeZone: timeZone }),
            city:  data.name|| data[0]?.name|| 'Unknown',
            temp_c: data.main?.temp || data[0]?.main?.temp || 'Unknown',
            wind_kph: data.wind?.speed || data[0]?.wind?.speed || 'Unknown',
            humidity: data.main?.humidity ||data[0]?.main?.humidity || 'Unknown',
            description: data.weather?.[0]?.description || data[0]?.weather?.[0]?.description || 'Unknown',
            country:data.main?.pressure || data[0]?.main?.pressure || 'Unknown' ,
            icon: data.weather?.[0]?.icon || data[0]?.weather?.[0]?.icon || 'Unknown' ,
            pressure: data.main?.pressure || data[0]?.main?.pressure || 'Unknown'
        }),
    })
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.error('Error inserting weather data:', error));
}


function saveWeatherToLocal(city, data) {
    // Check if data for the city already exists in local storage
    const storedData = localStorage.getItem(city);
    if (storedData) {
      // If data exists, append new data to the existing array
      const existingData = JSON.parse(storedData);
      existingData.push(data);
      localStorage.setItem(city, JSON.stringify(existingData));
    } else {
      // If no data exists, create a new array and store the data
      localStorage.setItem(city, JSON.stringify([data]));
    }
  }
  
  searchbox.addEventListener("keydown", handleEnterKeyPress);

  function handleEnterKeyPress(event) {
    if (event.key === 'Enter') {
        if(searchbox.value.trim() === ""){
            defaultweather(defaultCity);
        }
        else{
            searchWeather();
        }
    }
}