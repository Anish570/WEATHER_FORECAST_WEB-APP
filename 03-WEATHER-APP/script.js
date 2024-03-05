const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather img"); // Corrected query selector
const form = document.querySelector("form");
const forecast = document.querySelector(".forecast");

async function checkWeather(city) {
    let data = await searchAndSave(city);
    console.log("Data received from local database:");
    console.log(data);
    
    if (data === null || data.error === true) {
        console.log("Data not found in local database");
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        console.log("Data found in local database");
        const currentDate = new Date();
        const currentDayOfWeek = currentDate.toLocaleDateString('en-US', { weekday: 'long' });
        const time = currentDate.toLocaleTimeString();
        const currentData = data.filter(entry => entry.day_of_week === currentDayOfWeek);
        console.log("Data received from database for today's day:");
        console.log(currentData);
        
        document.querySelector(".weather .city").innerHTML = currentData[0].city +"," + currentData[0].country;
        document.querySelector(".temp").innerHTML = Math.round(currentData[0].temp) + "°C";
        document.querySelector(".weather .des").innerHTML = currentData[0].weather_description;
        weatherIcon.src = "https://openweathermap.org/img/w/"+ currentData[0].weather_icon + ".png"; // Set the src attribute of the image
        console.log(`weather icon received is ${weatherIcon.src}`);
       
        document.querySelector(".humidity").innerHTML = currentData[0].humidity + "%";
        document.querySelector(".wind").innerHTML = currentData[0].speed + "m/s";
        document.querySelector(".pressure").innerHTML = currentData[0].pressure + " hPa";
        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
}
setInterval(function () {
    const currentDate = new Date();
    const formattedDateTime = currentDate.toLocaleString();
    document.querySelector('.weather .time').textContent = formattedDateTime;
}, 1000);


async function searchAndSave(city) {
    let storedData = localStorage.getItem(city);
    if (storedData) {
        return JSON.parse(storedData);
    } else {
        const response = await fetch(`data.php?city=${city}`);
        if (response.status === 404) {
            console.log("City not found on the server");
            return null;
        } else {
            const data = await response.json();
            localStorage.setItem(city, JSON.stringify(data));
            return data;
        }
    }
}

async function getPastData(city){
    forecast.innerHTML="";
    const response = await searchAndSave(city);
    const data = await response;
    console.log(data);
    for(let i=0;i<data.length;i++){
        const createCard = createWeatherCard(data[i]);
        forecast.appendChild(createCard);
    }
    

}

function createWeatherCard(data){
    document.querySelector(".data").innerHTML = "7 Days weather forecast of " + data.city;
    const card = document.createElement("div");
    card.className = "card-component";

    const city = document.createElement("h1");
    city.innerHTML = data.city;
    card.appendChild(city);

    const temp = document.createElement("p");
    temp.innerHTML = "Temp: "+data.temp+ "°C";
    card.appendChild(temp);

    const pressure = document.createElement("p");
    pressure.innerHTML = "Pres: "+data.pressure +" hPa";
    card.appendChild(pressure);

    const humidity = document.createElement("p");
    humidity.innerHTML = "Hum: "+data.humidity + "%";
    card.appendChild(humidity);

    const speed = document.createElement("p");
    speed.innerHTML = "Wind: "+data.speed + " m/s";
    card.appendChild(speed);

    const day_of_week = document.createElement("p");
    day_of_week.innerHTML = data.day_of_week;
    card.appendChild(day_of_week);

    const icon = document.createElement("img");
    icon.src = `https://openweathermap.org/img/w/${data.weather_icon}.png`;
    card.appendChild(icon);

    const condition = document.createElement("h2");
    condition.innerHTML = data.weather_description;
    card.appendChild(condition);

    const weather_when = document.createElement("p");
    weather_when.innerHTML = data.weather_when;
    card.appendChild(weather_when);

    return card;
}

// Initial call with a default city
checkWeather('orai');
getPastData("orai");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (searchBox.value.trim() === "") {
        checkWeather('orai');
    } else {
        checkWeather(searchBox.value.toLowerCase());
        getPastData(searchBox.value.toLowerCase());
    }
});
