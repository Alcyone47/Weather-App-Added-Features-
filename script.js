/* Current/Forecast switch */
const currentBtn=document.querySelector(".current");
const forecastBtn=document.querySelector(".forecast");
const moveBtn=document.querySelector(".moveBtn");
const current_det=document.querySelector(".current-det");
const forecast_det=document.querySelector(".forecast-det");
const details=document.querySelector(".details")

currentBtn.addEventListener("click",()=>{
    moveBtn.classList.remove("rightBtn");
    current_det.classList.add("cd");
    forecast_det.classList.remove("fd");
    moveBtn.innerHTML=("Current");
})

forecastBtn.addEventListener("click",()=>{
    moveBtn.classList.add("rightBtn");
    forecast_det.classList.add("fd");
    current_det.classList.remove("cd");
    details.classList.remove("current-det");
    moveBtn.innerHTML=("Forecast");
})


/* API Control */
let weather = {
    apiKey: "8c27a71e3902d390bf1c0f520111bbe0",
    fetchWeather: function (city) {
        fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
            city +
            "&units=metric&appid=" +
            this.apiKey
        )
        .then((response) => {
            if (!response.ok) {
            alert("Location not found");
            throw new Error("Locatoin not found");
            }
            return response.json();
        })
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src =
        "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText =
        "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText =
        "Wind speed: " + speed + " km/h";
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage =
        "url('https://source.unsplash.com/1600x900/?" + name + " " + temp +"')";
    },
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    },
};

document.querySelector(".search button.enter").addEventListener("click", function () {
    weather.search();
});

document
    .querySelector(".search-bar")
    .addEventListener("keyup", function (event) {
        if (event.key == "Enter") {
        weather.search();
        }
    });

weather.fetchWeather("Beverly Hills");
