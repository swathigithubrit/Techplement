const apiKey=`13fa90b895470b50ab6748af7f86964b`;
//const city="Dubai";

async function fetchWeatherData(city){
    try{
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
       
      if(!response.ok){
        throw new Error("Unable to fetch weather data");
      }

    const data = await response.json();
    console.log(data);
    //console.log(data.main.temp);
    updateWeatherUI(data);
    }
    catch(error){
        console.error(error);
    }
}
function updateWeatherUI(data){
    const cityElement = document.querySelector(".city");
    const temperature = document.querySelector(".temp");
    const windSpeed = document.querySelector(".wind-speed");
    const humidity = document.querySelector(".humidity");
    const visibility = document.querySelector(".visibility-distance");
    const descriptionText = document.querySelector(".description-text");
    const date = document.querySelector(".date");
    const descriptionIcon = document.querySelector(".description i");
//fetchWeatherData();
    cityElement.textContent = data.name;
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    windSpeed.textContent = `${data.wind.speed} km/h`;
    humidity.textContent = `${data.main.humidity}%`;
    visibility.textContent = `${data.visibility / 1000} km`;
    descriptionText.textContent = data.weather[0].description;

    const currentDate = new Date();
    date.textContent = currentDate.toDateString();
    const weatherIconName = getWeatherIconName(data.weather[0].main);
    descriptionIcon.innerHTML =`<i class="material-icons">${weatherIconName}</i>`;
}


const formElement = document.querySelector(".search-form");
const inputElement = document.querySelector('.city-input');


formElement.addEventListener('submit', function(e){
    e.preventDefault();

    const city = inputElement.value;
    if (city !== ""){
        fetchWeatherData(city);
        inputElement.value="";
    }
});

function getWeatherIconName(weatherCondition) {
    const iconMap ={
        Clear: "wb_sunny",
        Clouds: "wb_cloudy",
        Rain: "umbrella",
        Thunderstorm: "flash_on",
        Drizzle: "grain",
        Snow: "ac_unit",
        Mist: "cloudy",
        Smoke: "cloudy",
        Haze: "cloudy",
        Fog: "cloudy"
    };

    const formattedCondition = weatherCondition.charAt(0).toUpperCase() + weatherCondition.slice(1).toLowerCase();
    return iconMap[formattedCondition] || "wb_unknown";
}
