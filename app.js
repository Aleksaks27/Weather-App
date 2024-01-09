const button = document.querySelector("button");
const input = document.querySelector("input");
const container = document.querySelector("#container");
const place = document.querySelector("#location");
const icon = document.querySelector("#icon");
const headline = document.querySelector("#headline");
const time = document.querySelector("#time");
const temperature = document.querySelector("#temperature");
const feelsLike = document.querySelector("#feelsLike");
const rain = document.querySelector("#rain");
const humidity = document.querySelector("#humidity");
const windSpeed = document.querySelector("#wind");
const windDirection = document.querySelector("#windDirection");

let locationValid = true;
let information = {};

const getAllData = async function(city) {
    const weather = await fetch('https://api.weatherapi.com/v1/current.json?key=e1dc5b3aa4464ace8f7224321240401&q=' + city);
    const response = await weather.json();
    return response;
}

const getSpecificData = async function(city){
    try{
        locationValid = true;
        let data = await getAllData(city);
        information = {
            city: data["location"]["name"],
            country: data["location"]["country"],
            time: data["location"]["localtime"],
            icon: data["current"]["condition"]["icon"],
            headline: data["current"]["condition"]["text"],
            temperature: data["current"]["temp_c"],
            feelsLike: data["current"]["feelslike_c"],
            rain: data["current"]["precip_mm"],
            humidity: data["current"]["humidity"],
            windSpeed: data["current"]["wind_mph"],
            windDirection: data["current"]["wind_dir"]
        };
    } catch{
        locationValid = false;
        alert("Please enter a valid location!");
    }

}

const updateDisplay = function() {
    place.textContent = `${information.city}, ${information.country}`;
    time.textContent = `${information.time}`;
    headline.textContent = `${information.headline}`;
    icon.innerHTML = `<img src="https:${information.icon}">`;
    temperature.innerHTML = `<p><b>Temperature</b>: ${information.temperature}°C</p>`;
    feelsLike.innerHTML = `<p><b>Feels like</b>: ${information.feelsLike}°C</p>`;
    rain.innerHTML = `<p><b>Rain</b>: ${information.rain}mm/hour</p>`;
    humidity.innerHTML = `<p><b>Humidity</b>: ${information.humidity}%</p>`;
    wind.innerHTML = `<p><b>Wind speed</b>: ${information.windSpeed}mph</p>`;
    windDirection.innerHTML = `<p><b>Wind direction</b>: ${information.windDirection}</p>`;
}

button.addEventListener("click", async () => {
        await getSpecificData(input.value);
        if (locationValid) {
            updateDisplay();
        }
});

document.addEventListener('DOMContentLoaded', async () => {
    await getSpecificData("London");
    updateDisplay();
});