const button = document.querySelector("button");
const input = document.querySelector("input");
const place = document.querySelector("#place");
const time = document.querySelector("#time");
const temperature = document.querySelector("#temperature");
const rain = document.querySelector("#rain");
const wind = document.querySelector("#wind");

let information = {};

const getAllData = async function(city) {
    const weather = await fetch('https://api.weatherapi.com/v1/current.json?key=e1dc5b3aa4464ace8f7224321240401&q=' + city);
    const response = await weather.json();

    return response
}

const getSpecificData = async function(city){
    let data = await getAllData(city);
    information = {
        city: data["location"]["name"],
        country: data["location"]["country"],
        time: data["location"]["localtime"],
        temperature: data["current"]["temp_c"],
        temperature_feelslike: data["current"]["feelslike_c"],
        rain: data["current"]["precip_mm"],
        humidity: data["current"]["humidity"],
        wind_speed: data["current"]["wind_mph"],
        wind_direction: data["current"]["wind_dir"]
    };

    console.log(information);
}

const updateDisplay = function() {
    place.textContent = `City: ${information.city}, Country: ${information.country}`;
    time.textContent = `Local Time: ${information.time}`;
    temperature.textContent = `Temperature: ${information.temperature}, Feels like: ${information.temperature_feelslike}`;
    rain.textContent = `Rain: ${information.rain}mm, Humidity: ${information.humidity}%`
    wind.textContent = `Wind speed: ${information.wind_speed}mph, Wind direction: ${information.wind_direction}`;
}

getSpecificData("london");
updateDisplay();

button.addEventListener("click", () => {
    getSpecificData(input.value);
    updateDisplay();
});