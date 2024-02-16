const timeEl = document.getElementById("time");
const dateEl = document.getElementById("date");
const currentWeatherItemsEl = document.getElementById("current-weather-items");
const timeZone = document.getElementById("time-zone");
const countryEl = document.getElementById("country");
const weatherForecastEl = document.getElementById("weather-forecast");
const currentTempEl = document.getElementById("current-temp");
const currentCity = document.getElementById("current-city");
const searchBar = document.getElementById("searchBar");
const searchButton = document.getElementById("searchButton");

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const API_KEY = 'f654557b273f7dc31c27ce018d40fd1a';

setInterval(() => {
  const time = new Date();
  const month = time.getMonth();
  const date = time.getDate();
  const day = time.getDay();
  const hour = time.getHours();
  const hoursIn12 = hour >= 13  ? hour %12: hour
  const minute = time.getMinutes();
  const ampm = hour >= 12 ? 'PM' : 'AM' //hour might have to go back to "hours"

  timeEl.innerHTML = hoursIn12 + ':' + minute + '' + `<span id="am-pm">${ampm}</span>`

  dateEl.innerHTML = days[day] + ', ' + months[month] + ' ' + date; 

}, 1000);

getForecast()

function getForecast() {
  navigator.geolocation.getCurrentPosition((success) => {
    console.log(success)

    let{latitude, longitude} = success.coords;

    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=imperial&appid=${API_KEY}`).then(res => res.json()).then(data => {
      console.log(data)
      showWeatherData(data)
    })
  })
}

function showWeatherData(data){
  console.log(data)

  const currentForecast = data.list[0];
  const humidity = currentForecast.main.humidity;
  const pressure = currentForecast.main.pressure;
  const wind_speed = currentForecast.wind.speed;

  currentWeatherItemsEl.innerHTML = `
    <div class="weather-item">
      <div>Humidity</div>
      <div>${humidity}%</div>
    </div>
    <div class="weather-item">
      <div>Wind Speed</div>
      <div>${wind_speed} MPH</div>
    </div>
    <div class="weather-item">
      <div>Pressure</div>
      <div>${pressure} PSI</div>
    </div>
  `;
}




