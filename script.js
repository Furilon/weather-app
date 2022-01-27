async function getData(city, state) {
    const url =
     `http://api.openweathermap.org/data/2.5/weather?q=${city},${state}&appid=fd80244eb438a5e523f948e21723406f`

    console.log(url)

    const response = await fetch(url, {mode: "cors"});
    const data = await response.json();
    
    const location = data.name + ", " + data.sys.country;
    const main = data.weather[0].main;
    const temperature = Math.round((data.main.temp - 273.15) * (9 / 5) + 32);
    const feelsLike = Math.round((data.main.feels_like - 273.15) * (9 / 5) + 32);
    const wind = data.wind.speed;
    const clouds = data.clouds.all;

    return { location, main, temperature, feelsLike, wind, clouds };
}


const btn = document.querySelector('button');
btn.addEventListener('click', async function (e) {
    const city = document.getElementById("city").value;
    const state = document.getElementById('state').value;
    const data = await getData(city, state);
    console.log(data)

    const location = document.getElementById('location')
    location.textContent = "Location: " + data.location;

    const main = document.getElementById('main');
    main.textContent = "Weather: " + data.main;

    const temp = document.getElementById('temp');
    temp.textContent = "Temp (F): " + data.temperature;

    const tempFeels = document.getElementById('temp-feels');
    tempFeels.textContent = "Feels like: " + data.feelsLike;

    const wind = document.getElementById('wind');
    wind.textContent = "Wind (meters/sec): " + data.wind;

    const clouds = document.getElementById('clouds');
    clouds.textContent = "Clouds: " + data.clouds;
})
