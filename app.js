const button = document.querySelector("button");
const input = document.querySelector("input");
const container = document.querySelector("#container");
const place = document.querySelector("#location");
const map = document.querySelector("#map");
const icon = document.querySelector("#icon");
const headline = document.querySelector("#headline");
const time = document.querySelector("#time");
const temperature = document.querySelector("#temperature");
const feelsLike = document.querySelector("#feels-like");
const rain = document.querySelector("#rain");
const humidity = document.querySelector("#humidity");
const windSpeed = document.querySelector("#wind");
const windDirection = document.querySelector("#wind-direction");
const sunRise = document.querySelector("#sun-rise");
const sunSet = document.querySelector("#sun-set");
const temp6am = document.querySelector("#temp-6am");
const temp9am = document.querySelector("#temp-9am");
const temp12pm = document.querySelector("#temp-12pm");
const temp3pm = document.querySelector("#temp-3pm");
const temp6pm = document.querySelector("#temp-6pm");

let locationValid = true;
let mainInformation = {};
let dailyForecast = {};
let mapURL;

// The asynchronous getAllData function retrieves the weather forecast data for a given location from an API.
const getAllData = async function(city) {
    const weather = await fetch('https://api.weatherapi.com/v1/forecast.json?key=e1dc5b3aa4464ace8f7224321240401&q=' + city);
    const response = await weather.json();
    return response;
}

// Once the first set of data is received a separate API call is made to generate a map view of the area.
const getSpecificData = async function(city){
    try{
        locationValid = true;
        let data = await getAllData(city);
        let coordinates = `${data["location"]["lat"]},${data["location"]["lon"]}`
        mapURL = `https://dev.virtualearth.net/REST/V1/Imagery/Map/Road/${coordinates}/7?pushpin=${coordinates}&mapSize=400,300&format=jpeg&key=AgSlocWfNLuVZMQ8r84vS2pZ-3QM0Pgu1vhpUjerS3e7ucIZjuT-I9vlg3C0MX7l`;
        mainInformation = {
            city: data["location"]["name"],
            country: data["location"]["country"],
            time: new Date().toString().slice(0,24),
            icon: data["current"]["condition"]["icon"],
            headline: data["current"]["condition"]["text"],
            temperature: data["current"]["temp_c"],
            feelsLike: data["current"]["feelslike_c"],
            rain: data["current"]["precip_mm"],
            humidity: data["current"]["humidity"],
            windSpeed: data["current"]["wind_mph"],
            windDirection: data["current"]["wind_dir"],
            sunRise: data["forecast"]["forecastday"][0]["astro"]["sunrise"],
            sunSet: data["forecast"]["forecastday"][0]["astro"]["sunset"],
        };
        dailyForecast = {
            temp6am: data["forecast"]["forecastday"][0]["hour"][6]["temp_c"],
            icon6am: data["forecast"]["forecastday"][0]["hour"][6]["condition"]["icon"],
            temp9am: data["forecast"]["forecastday"][0]["hour"][9]["temp_c"],
            icon9am: data["forecast"]["forecastday"][0]["hour"][9]["condition"]["icon"],
            temp12pm: data["forecast"]["forecastday"][0]["hour"][12]["temp_c"],
            icon12pm: data["forecast"]["forecastday"][0]["hour"][12]["condition"]["icon"],
            temp3pm: data["forecast"]["forecastday"][0]["hour"][15]["temp_c"],
            icon3pm: data["forecast"]["forecastday"][0]["hour"][15]["condition"]["icon"],
            temp6pm: data["forecast"]["forecastday"][0]["hour"][18]["temp_c"],
            icon6pm: data["forecast"]["forecastday"][0]["hour"][18]["condition"]["icon"],
        };
    } catch{
        locationValid = false;
        alert("Please enter a valid location!");
    }

}

const updateDisplay = function() {
    place.textContent = `${mainInformation.city}, ${mainInformation.country}`;
    map.src = mapURL;
    time.textContent = `${mainInformation.time}`;
    headline.textContent = `${mainInformation.headline}`;
    icon.innerHTML = `<img src="https:${mainInformation.icon}">`;

    temperature.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M160 64c-26.5 0-48 21.5-48 48V276.5c0 17.3-7.1 31.9-15.3 42.5C86.2 332.6 80 349.5 80 368c0 44.2 35.8 80 80 80s80-35.8 80-80c0-18.5-6.2-35.4-16.7-48.9c-8.2-10.6-15.3-25.2-15.3-42.5V112c0-26.5-21.5-48-48-48zM48 112C48 50.2 98.1 0 160 0s112 50.1 112 112V276.5c0 .1 .1 .3 .2 .6c.2 .6 .8 1.6 1.7 2.8c18.9 24.4 30.1 55 30.1 88.1c0 79.5-64.5 144-144 144S16 447.5 16 368c0-33.2 11.2-63.8 30.1-88.1c.9-1.2 1.5-2.2 1.7-2.8c.1-.3 .2-.5 .2-.6V112zM208 368c0 26.5-21.5 48-48 48s-48-21.5-48-48c0-20.9 13.4-38.7 32-45.3V208c0-8.8 7.2-16 16-16s16 7.2 16 16V322.7c18.6 6.6 32 24.4 32 45.3z"/></svg><p> ${mainInformation.temperature}°C</p>`;
    feelsLike.innerHTML = `<p><b>Feels Like</b></p><p>${mainInformation.feelsLike}°C</p>`;
    rain.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M96 320c-53 0-96-43-96-96c0-42.5 27.6-78.6 65.9-91.2C64.7 126.1 64 119.1 64 112C64 50.1 114.1 0 176 0c43.1 0 80.5 24.3 99.2 60c14.7-17.1 36.5-28 60.8-28c44.2 0 80 35.8 80 80c0 5.5-.6 10.8-1.6 16c.5 0 1.1 0 1.6 0c53 0 96 43 96 96s-43 96-96 96H96zm-6.8 52c1.3-2.5 3.9-4 6.8-4s5.4 1.5 6.8 4l35.1 64.6c4.1 7.5 6.2 15.8 6.2 24.3v3c0 26.5-21.5 48-48 48s-48-21.5-48-48v-3c0-8.5 2.1-16.9 6.2-24.3L89.2 372zm160 0c1.3-2.5 3.9-4 6.8-4s5.4 1.5 6.8 4l35.1 64.6c4.1 7.5 6.2 15.8 6.2 24.3v3c0 26.5-21.5 48-48 48s-48-21.5-48-48v-3c0-8.5 2.1-16.9 6.2-24.3L249.2 372zm124.9 64.6L409.2 372c1.3-2.5 3.9-4 6.8-4s5.4 1.5 6.8 4l35.1 64.6c4.1 7.5 6.2 15.8 6.2 24.3v3c0 26.5-21.5 48-48 48s-48-21.5-48-48v-3c0-8.5 2.1-16.9 6.2-24.3z"/></svg><p>${mainInformation.rain}mm/hour</p>`;
    humidity.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M192 512C86 512 0 426 0 320C0 228.8 130.2 57.7 166.6 11.7C172.6 4.2 181.5 0 191.1 0h1.8c9.6 0 18.5 4.2 24.5 11.7C253.8 57.7 384 228.8 384 320c0 106-86 192-192 192zM96 336c0-8.8-7.2-16-16-16s-16 7.2-16 16c0 61.9 50.1 112 112 112c8.8 0 16-7.2 16-16s-7.2-16-16-16c-44.2 0-80-35.8-80-80z"/></svg><p>${mainInformation.humidity}%</p>`;
    wind.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M288 32c0 17.7 14.3 32 32 32h32c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H352c53 0 96-43 96-96s-43-96-96-96H320c-17.7 0-32 14.3-32 32zm64 352c0 17.7 14.3 32 32 32h32c53 0 96-43 96-96s-43-96-96-96H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H384c-17.7 0-32 14.3-32 32zM128 512h32c53 0 96-43 96-96s-43-96-96-96H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H160c17.7 0 32 14.3 32 32s-14.3 32-32 32H128c-17.7 0-32 14.3-32 32s14.3 32 32 32z"/></svg><p>${mainInformation.windSpeed}mph</p>`;
    windDirection.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm306.7 69.1L162.4 380.6c-19.4 7.5-38.5-11.6-31-31l55.5-144.3c3.3-8.5 9.9-15.1 18.4-18.4l144.3-55.5c19.4-7.5 38.5 11.6 31 31L325.1 306.7c-3.2 8.5-9.9 15.1-18.4 18.4zM288 256a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"/></svg><p>${mainInformation.windDirection}</p>`;
    sunRise.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M375.7 19.7c-1.5-8-6.9-14.7-14.4-17.8s-16.1-2.2-22.8 2.4L256 61.1 173.5 4.2c-6.7-4.6-15.3-5.5-22.8-2.4s-12.9 9.8-14.4 17.8l-18.1 98.5L19.7 136.3c-8 1.5-14.7 6.9-17.8 14.4s-2.2 16.1 2.4 22.8L61.1 256 4.2 338.5c-4.6 6.7-5.5 15.3-2.4 22.8s9.8 13 17.8 14.4l98.5 18.1 18.1 98.5c1.5 8 6.9 14.7 14.4 17.8s16.1 2.2 22.8-2.4L256 450.9l82.5 56.9c6.7 4.6 15.3 5.5 22.8 2.4s12.9-9.8 14.4-17.8l18.1-98.5 98.5-18.1c8-1.5 14.7-6.9 17.8-14.4s2.2-16.1-2.4-22.8L450.9 256l56.9-82.5c4.6-6.7 5.5-15.3 2.4-22.8s-9.8-12.9-17.8-14.4l-98.5-18.1L375.7 19.7zM269.6 110l65.6-45.2 14.4 78.3c1.8 9.8 9.5 17.5 19.3 19.3l78.3 14.4L402 242.4c-5.7 8.2-5.7 19 0 27.2l45.2 65.6-78.3 14.4c-9.8 1.8-17.5 9.5-19.3 19.3l-14.4 78.3L269.6 402c-8.2-5.7-19-5.7-27.2 0l-65.6 45.2-14.4-78.3c-1.8-9.8-9.5-17.5-19.3-19.3L64.8 335.2 110 269.6c5.7-8.2 5.7-19 0-27.2L64.8 176.8l78.3-14.4c9.8-1.8 17.5-9.5 19.3-19.3l14.4-78.3L242.4 110c8.2 5.7 19 5.7 27.2 0zM256 368a112 112 0 1 0 0-224 112 112 0 1 0 0 224zM192 256a64 64 0 1 1 128 0 64 64 0 1 1 -128 0z"/></svg><p>${mainInformation.sunRise}</p>`;
    sunSet.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M144.7 98.7c-21 34.1-33.1 74.3-33.1 117.3c0 98 62.8 181.4 150.4 211.7c-12.4 2.8-25.3 4.3-38.6 4.3C126.6 432 48 353.3 48 256c0-68.9 39.4-128.4 96.8-157.3zm62.1-66C91.1 41.2 0 137.9 0 256C0 379.7 100 480 223.5 480c47.8 0 92-15 128.4-40.6c1.9-1.3 3.7-2.7 5.5-4c4.8-3.6 9.4-7.4 13.9-11.4c2.7-2.4 5.3-4.8 7.9-7.3c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-3.7 .6-7.4 1.2-11.1 1.6c-5 .5-10.1 .9-15.3 1c-1.2 0-2.5 0-3.7 0c-.1 0-.2 0-.3 0c-96.8-.2-175.2-78.9-175.2-176c0-54.8 24.9-103.7 64.1-136c1-.9 2.1-1.7 3.2-2.6c4-3.2 8.2-6.2 12.5-9c3.1-2 6.3-4 9.6-5.8c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-3.6-.3-7.1-.5-10.7-.6c-2.7-.1-5.5-.1-8.2-.1c-3.3 0-6.5 .1-9.8 .2c-2.3 .1-4.6 .2-6.9 .4z"/></svg><p>${mainInformation.sunSet}</p>`;

    temp6am.innerHTML = `<p><b>6 am</b></p> <p>${dailyForecast.temp6am}°C</p> <img src=https:${dailyForecast.icon6am}>`;
    temp9am.innerHTML = `<p><b>9 am</b></p> <p>${dailyForecast.temp9am}°C</p> <img src=https:${dailyForecast.icon9am}>`;
    temp12pm.innerHTML = `<p><b>12 pm</b></p> <p>${dailyForecast.temp12pm}°C</p> <img src=https:${dailyForecast.icon12pm}>`;
    temp3pm.innerHTML = `<p><b>3 pm</b></p> <p>${dailyForecast.temp3pm}°C</p> <img src=https:${dailyForecast.icon3pm}>`;
    temp6pm.innerHTML = `<p><b>6 pm</b></p> <p>${dailyForecast.temp6pm}°C</p> <img src=https:${dailyForecast.icon6pm}>`;
}

// The location entered is assumed to be valid but if it's not, the dashboard won't update (with undefined values).
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