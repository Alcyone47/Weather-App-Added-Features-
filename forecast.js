const weatherForecastEl = document.getElementById('weather-forecast');
const currentWeatherItemsEl = document.getElementById('current-weather-items');
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');

setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const hoursIn12HrFormat = hour >= 13 ? hour %12: hour
    const minutes = time.getMinutes();
    const ampm = hour >=12 ? 'PM' : 'AM'
    timeEl.innerHTML = (hoursIn12HrFormat < 10? '0'+hoursIn12HrFormat : hoursIn12HrFormat) + ':' + (minutes < 10? '0'+minutes: minutes)+ ' ' + `<span id="am-pm">${ampm}</span>`
    dateEl.innerHTML = days[day] + ', ' + date+ ' ' + months[month]
}, 1000);

let forecast = {
    apiKey:"c66baccd807040d96a240ca4d3f6fcfb",
    fetchForecast:function(city){
        fetch(
            "https://api.openweathermap.org/data/2.5/forecast/daily?q="+city+"&cnt=7&appid="+this.apiKey
        )
        .then((response) => {
            if (!response.ok){
                /*alert("Loading forecast failed");*/
            }
            return response.json
        })
    .then((data) => this.forecastWeather(data));
    },

    forecastWeather: function(data){
        let otherDayForcast = ''
        data.daily.forEach((day, idx) => {
            if(idx == 0){
                currentTempEl.innerHTML = `
                <img src="http://openweathermap.org/img/wn//${day.weather[0].icon}@4x.png" alt="weather icon" class="w-icon">
                <div class="other">
                    <div class="day">${window.moment(day.dt*1000).format('dddd')}</div>
                    <div class="temp">Night - ${day.temp.night}&#176;C</div>
                    <div class="temp">Day - ${day.temp.day}&#176;C</div>
                </div>
                
                `
            }else{
                otherDayForcast += `
                <div class="weather-forecast-item">
                    <div class="day">${window.moment(day.dt*1000).format('ddd')}</div>
                    <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
                    <div class="temp">Night - ${day.temp.night}&#176;C</div>
                    <div class="temp">Day - ${day.temp.day}&#176;C</div>
                </div>
                
                `
            }
        })
        
        weatherForecastEl.innerHTML = otherDayForcast
    },

    search:function(){
        this.fetchForecast(document.querySelector(".search-bar").value);
    },
};

document.querySelector(".search button.enter").addEventListener("click",function(){
    forecast.search();
});

document
    .querySelector(".search-bar")
    .addEventListener("keyup",function(event){
        if (event.key == "Enter"){
            weather.search();
        }
    });

forecast.fetchForecast("Beverly Hills");
