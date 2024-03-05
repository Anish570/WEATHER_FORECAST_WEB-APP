const searchbox = document.querySelector(".search-box input");
const form = document.querySelector("form");
const searchbtn = document.getElementById("btn");
const img = document.querySelector(".weather-box img");
const sunimg = document.querySelector(".day1 img");
const monimg = document.querySelector(".day2 img");
const tueimg = document.querySelector(".day3 img");
const wedimg = document.querySelector(".day4 img");
const thuimg = document.querySelector(".day5 img");
const friimg = document.querySelector(".day6 img");
const satimg = document.querySelector(".day7 img");

document.addEventListener("DOMContentLoaded", () => {
  checkweather("nepal");
});

function checkweather(city) {
  const storedData = getFromLocalStorage(city);
  if (storedData) {
    document.querySelector(".not-found").style.display = "none";
    document.querySelector(".weather-box").style.display = "block";
    displayweather(storedData);
  } else {
    fetchWeatherFromServer(city);
  }
}

async function fetchWeatherFromServer(city) {
  const response = await fetch(`insert.php?cityname=${city}`);

  if (!response.ok) {
    document.querySelector(".not-found").style.display = "block";
    document.querySelector(".weather-box").style.display = "none";
  } else {
    document.querySelector(".not-found").style.display = "none";
    document.querySelector(".weather-box").style.display = "block";
    const weatherdata = await response.json();
    displayweather(weatherdata);
    localStorage.setItem(city, JSON.stringify(weatherdata));
  
  }
}
function displayweather(weatherdata) {
  const currentDate = new Date();
  const currentDayOfWeek = currentDate.toLocaleDateString("en-US", {
    weekday: "long",
  });
  // Filter the weather data based on the current day of the week
  const data = weatherdata.filter(
    (entry) => entry.Day_Of_Week === currentDayOfWeek
  );

console.log("data as of now:",data);

  const Sundaydata = weatherdata.filter(
    (entry) => entry.Day_Of_Week === "Sunday"
  );
  const Mondaydata = weatherdata.filter(
    (entry) => entry.Day_Of_Week === "Monday"
  );
  const Tuesdaydata = weatherdata.filter(
    (entry) => entry.Day_Of_Week === "Tuesday"
  );
  const Wednesdaydata = weatherdata.filter(
    (entry) => entry.Day_Of_Week === "Wednesday"
  );
  const Thursdaydata = weatherdata.filter(
    (entry) => entry.Day_Of_Week === "Thursday"
  );
  const Fridaydata = weatherdata.filter(
    (entry) => entry.Day_Of_Week === "Friday"
  );
  const Saturdaydata = weatherdata.filter(
    (entry) => entry.Day_Of_Week === "Saturday"
  );

  //Passing Current date data

  document.querySelector(".contryname h4").innerHTML =
    data[0]?.City + "," + data[0]?.Country;
  document.querySelector(".temp p").innerHTML = data[0]?.Weather_Description;
  document.querySelector("#temp").innerHTML =
    Math.round(data[0].Temperature) + "°C";
  document.querySelector(".row2 .wind span").innerHTML =
    data[0].Wind_Speed + "m/s";
  document.querySelector(".row2 .humi .value").innerHTML =
    data[0].Humidity + "%";
  document.querySelector(".row2 .pressure span").innerHTML =
    data[0].Pressure + "hPa";

  //Passing data according to data wise
  document.querySelector(".day1 #wdesc").innerHTML = Sundaydata[0]
    ?.Weather_Description
    ? Sundaydata[0].Weather_Description
    : "N/A";
  document.querySelector(".day1 #wtemp").innerHTML = Sundaydata[0]?.Temperature
    ? "Temperature: " + Math.round(Sundaydata[0].Temperature) + "°C"
    : "Temperature: N/A";
  document.querySelector(".day1 #wwind").innerHTML = Sundaydata[0]?.Wind_Speed
    ? "Wind: " + Sundaydata[0].Wind_Speed + "m/s"
    : "Wind: N/A";
  document.querySelector(".day1 #whumi").innerHTML = Sundaydata[0]?.Humidity
    ? "Humidity: " + Sundaydata[0].Humidity + "%"
    : "Humidity: N/A";
  document.querySelector(".day1 #wpress").innerHTML = Sundaydata[0]?.Pressure
    ? "Pressure: " + Sundaydata[0].Pressure + "hPa"
    : "Pressure: N/A";
  document.querySelector(".day1 img").innerHTML = Sundaydata[0]?.Icon
    ? Sundaydata[0].Icon
    : "N/A";

  //Monday weather data
  document.querySelector(".day2 #wdesc").innerHTML = Mondaydata[0]
    ?.Weather_Description
    ? Mondaydata[0].Weather_Description
    : "N/A";
  document.querySelector(".day2 #wtemp").innerHTML = Mondaydata[0]?.Temperature
    ? "Temperature: " + Math.round(Mondaydata[0].Temperature) + "°C"
    : "Temperature: N/A";
  document.querySelector(".day2 #wwind").innerHTML = Mondaydata[0]?.Wind_Speed
    ? "Wind: " + Mondaydata[0].Wind_Speed + "m/s"
    : "Wind: N/A";
  document.querySelector(".day2 #whumi").innerHTML = Mondaydata[0]?.Humidity
    ? "Humidity: " + Mondaydata[0].Humidity + "%"
    : "Humidity: N/A";
  document.querySelector(".day2 #wpress").innerHTML = Mondaydata[0]?.Pressure
    ? "Pressure: " + Mondaydata[0].Pressure + "hPa"
    : "Pressure: N/A";

  //Tuesday weather data
  document.querySelector(".day3 #wdesc").innerHTML = Tuesdaydata[0]
    ?.Weather_Description
    ? Tuesdaydata[0].Weather_Description
    : "N/A";
  document.querySelector(".day3 #wtemp").innerHTML = Tuesdaydata[0]?.Temperature
    ? "Temperature: " + Math.round(Tuesdaydata[0].Temperature) + "°C"
    : "Temperature: N/A";
  document.querySelector(".day3 #wwind").innerHTML = Tuesdaydata[0]?.Wind_Speed
    ? "Wind: " + Tuesdaydata[0].Wind_Speed + "m/s"
    : "Wind: N/A";
  document.querySelector(".day3 #whumi").innerHTML = Tuesdaydata[0]?.Humidity
    ? "Humidity: " + Tuesdaydata[0].Humidity + "%"
    : "Humidity: N/A";
  document.querySelector(".day3 #wpress").innerHTML = Tuesdaydata[0]?.Pressure
    ? "Pressure: " + Tuesdaydata[0].Pressure + "hPa"
    : "Pressure: N/A";

  //Wednesday weather data
  document.querySelector(".day4 #wdesc").innerHTML = Wednesdaydata[0]
    ?.Weather_Description
    ? Wednesdaydata[0].Weather_Description
    : "N/A";
  document.querySelector(".day4 #wtemp").innerHTML = Wednesdaydata[0]
    ?.Temperature
    ? "Temperature: " + Math.round(Wednesdaydata[0].Temperature) + "°C"
    : "Temperature: N/A";
  document.querySelector(".day4 #wwind").innerHTML = Wednesdaydata[0]
    ?.Wind_Speed
    ? "Wind: " + Wednesdaydata[0].Wind_Speed + "m/s"
    : "Wind: N/A";
  document.querySelector(".day4 #whumi").innerHTML = Wednesdaydata[0]?.Humidity
    ? "Humidity: " + Wednesdaydata[0].Humidity + "%"
    : "Humidity: N/A";
  document.querySelector(".day4 #wpress").innerHTML = Wednesdaydata[0]?.Pressure
    ? "Pressure: " + Wednesdaydata[0].Pressure + "hPa"
    : "Pressure: N/A";

  //Thursday weather data
  document.querySelector(".day5 #wdesc").innerHTML = Thursdaydata[0]
    ?.Weather_Description
    ? Thursdaydata[0].Weather_Description
    : "N/A";
  document.querySelector(".day5 #wtemp").innerHTML = Thursdaydata[0]
    ?.Temperature
    ? "Temperature: " + Math.round(Thursdaydata[0].Temperature) + "°C"
    : "Temperature: N/A";
  document.querySelector(".day5 #wwind").innerHTML = Thursdaydata[0]?.Wind_Speed
    ? "Wind: " + Thursdaydata[0].Wind_Speed + "m/s"
    : "Wind: N/A";
  document.querySelector(".day5 #whumi").innerHTML = Thursdaydata[0]?.Humidity
    ? "Humidity: " + Thursdaydata[0].Humidity + "%"
    : "Humidity: N/A";
  document.querySelector(".day5 #wpress").innerHTML = Thursdaydata[0]?.Pressure
    ? "Pressure: " + Thursdaydata[0].Pressure + "hPa"
    : "Pressure: N/A";

  //Friday weather data
  document.querySelector(".day6 #wdesc").innerHTML = Fridaydata[0]
    ?.Weather_Description
    ? Fridaydata[0].Weather_Description
    : "N/A";
  document.querySelector(".day6 #wtemp").innerHTML = Fridaydata[0]?.Temperature
    ? "Temperature: " + Math.round(Fridaydata[0].Temperature) + "°C"
    : "Temperature: N/A";
  document.querySelector(".day6 #wwind").innerHTML = Fridaydata[0]?.Wind_Speed
    ? "Wind: " + Fridaydata[0].Wind_Speed + "m/s"
    : "Wind: N/A";
  document.querySelector(".day6 #whumi").innerHTML = Fridaydata[0]?.Humidity
    ? "Humidity: " + Fridaydata[0].Humidity + "%"
    : "Humidity: N/A";
  document.querySelector(".day6 #wpress").innerHTML = Fridaydata[0]?.Pressure
    ? "Pressure: " + Fridaydata[0].Pressure + "hPa"
    : "Pressure: N/A";

  //Satruday weather data
  document.querySelector(".day7 #wdesc").innerHTML = Saturdaydata[0]
    ?.Weather_Description
    ? Saturdaydata[0].Weather_Description
    : "N/A";
  document.querySelector(".day7 #wtemp").innerHTML = Saturdaydata[0]
    ?.Temperature
    ? "Temperature: " + Math.round(Saturdaydata[0].Temperature) + "°C"
    : "Temperature: N/A";
  document.querySelector(".day7 #wwind").innerHTML = Saturdaydata[0]?.Wind_Speed
    ? "Wind: " + Saturdaydata[0].Wind_Speed + "m/s"
    : "Wind: N/A";
  document.querySelector(".day7 #whumi").innerHTML = Saturdaydata[0]?.Humidity
    ? "Humidity: " + Saturdaydata[0].Humidity + "%"
    : "Humidity: N/A";
  document.querySelector(".day7 #wpress").innerHTML = Saturdaydata[0]?.Pressure
    ? "Pressure: " + Saturdaydata[0].Pressure + "hPa"
    : "Pressure: N/A";
    
    const imageMapping = {
      'clear sky': 'https://cdn.pixabay.com/photo/2013/07/13/10/23/sun-157126_1280.png',
      'few clouds': 'https://cdn.pixabay.com/photo/2013/04/01/09/21/cloudy-98494_1280.png',
      'scattered clouds': 'https://cdn3.iconfinder.com/data/icons/weather-forecast-48/237/scattered-clouds-128.png',
      'broken clouds': 'https://cdn.pixabay.com/photo/2012/04/18/13/23/cloudy-37012_1280.png',
      'shower rain': 'https://cdn.pixabay.com/photo/2022/04/27/01/12/weather-7159428_1280.png',
      'rain': 'https://cdn.pixabay.com/photo/2013/07/13/12/47/drops-160354_1280.png',
      'overcast clouds': 'https://cdn.pixabay.com/photo/2013/04/01/09/22/clouds-98536_1280.png',
      'light rain': 'https://cdn.pixabay.com/photo/2013/07/13/10/23/weather-157125_1280.png',
      'mist': 'https://cdn.pixabay.com/photo/2013/04/01/09/21/fog-98505_1280.png',
      'fog': 'https://cdn.pixabay.com/photo/2017/08/21/21/26/wind-2667027_1280.png',
      'haze': 'https://cdn4.iconfinder.com/data/icons/remixicon-weather/24/haze-fill-512.png',
      'smoke': 'https://cdn-icons-png.flaticon.com/128/10206/10206934.png',
      'moderate rain': 'https://cdn.pixabay.com/photo/2013/07/13/10/23/weather-157125_1280.png',
      'foggy': 'https://cdn.pixabay.com/photo/2017/08/21/21/26/wind-2667027_1280.png',
      'sunny': 'https://cdn.pixabay.com/photo/2013/07/13/10/23/sun-157126_1280.png',
      'cloudy': 'https://cdn.pixabay.com/photo/2017/08/21/21/26/wind-2667027_1280.png',
      'partly cloudy': 'https://cdn.pixabay.com/photo/2013/04/01/09/21/cloudy-98494_1280.png',
      'heavy rain':'https://cdn.pixabay.com/photo/2013/07/13/12/47/drops-160354_1280.png', 
      'light snow': 'https://cdn.pixabay.com/photo/2012/04/18/13/23/cloudy-37012_1280.png',
  };
  function setWeatherImage(imgElement, weatherData) {
      if (!weatherData || !weatherData[0] || !weatherData[0].Weather_Description) {
           imgElement.src = 'image-not-available.png'; 
      } else {
          const weatherDescription = weatherData[0].Weather_Description.toLowerCase();
          const imageUrl = imageMapping[weatherDescription];
          imgElement.src = imageUrl ? `${imageUrl}` : 'image-not-available.png';
          console.log("condition meet")
      }
  }

  // Usage example for each day
  setWeatherImage(img, data);
  setWeatherImage(sunimg, Sundaydata);
  setWeatherImage(monimg, Mondaydata);
  setWeatherImage(tueimg, Tuesdaydata);
  setWeatherImage(wedimg, Wednesdaydata);
  setWeatherImage(thuimg, Thursdaydata);
  console.log('thrusday data:',Thursdaydata)
  setWeatherImage(friimg, Fridaydata);
  setWeatherImage(satimg, Saturdaydata);
}

setInterval(function () {
  const currentDate = new Date();
  const formattedDateTime = currentDate.toLocaleString();
  document.querySelector(".contryname .time").textContent = formattedDateTime;
}, 1000);

function getFromLocalStorage(cityName) {
  const storedData = localStorage.getItem(cityName);
  if (storedData) {
    return JSON.parse(storedData);
  } else {
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (searchbox.value.trim() === "") {
    const city = "nepal";
    checkweather(city);
  }
  checkweather(searchbox.value.toLowerCase());
});
