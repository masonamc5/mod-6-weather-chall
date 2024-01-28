const weather = {
  "api-key": "f654557b273f7dc31c27ce018d40fd1a"
};

const search = document.getElementById('search');
const currentCity = document.getElementById('city');
const searchBar = document.getElementById("searchBar");
const searchButton = document.getElementById('searchButton')
const forecastCard = document.getElementById('card-body')
const cardTitles = document.getElementsByClassName('.card-title');
const cardSubtitles = document.getElementsByClassName('.card-subtitle');
const cardTexts = document.getElementsByClassName('.card-text');

searchButton.addEventListener('submit', getForecast)

function getForecast() {
  const searchWeather = {
    city: searchBar.value,
    units: 'metric',
    lang: 'en'
  };

  

  if (!searchWeather.city) {
    alert('Please enter a valid city');
    
  } else {

  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${searchWeather.city}&units=${searchWeather.units}&lang=${searchWeather.lang}&appid=${weather['api-key']}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      handleForecastData(data);
    })
    .catch(error => {
      console.error('Error fetching forecast data:', error);
      alert('Error fetching forecast data. Please try again later.');
    });

  localStorage.setItem("searchWeather", JSON.stringify(searchWeather));
}}


function handleForecastData(data) {
  console.log('Forecast data:', data);

  currentCity.textContent = data.city.name;

  let dayIndex = 0;
  for (let i = 0; i < data.list.length; i++) {
    const forecastItem = data.list[i];
    const forecastDate = new Date(forecastItem.dt * 1000);

    if (forecastDate.getHours() === 12 && dayIndex < forecastCard.length) {
      const cardBody = forecastCard[dayIndex];

      const dateElement = cardBody.querySelector('.card-subtitle');
      const titleElement = cardBody.querySelector('.card-title');
      const temperatureElement = cardBody.querySelector('.card-text');

      console.log('Checking values:', forecastDate, titleElement, temperatureElement);


     
      if (dateElement && titleElement && temperatureElement) {
        console.log('Updating elements for day:', dayIndex + 1);

        dateElement.textContent = forecastDate.toDateString();
        titleElement.textContent = `Day ${dayIndex + 1}`;
        temperatureElement.textContent = `Temperature: ${forecastItem.main.temp}°C`;

        dayIndex++;
      } else {
        console.error('Error: One or more elements not found.');
      }
    }
  }
}

