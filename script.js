document.getElementById('search').addEventListener('blur', getWeatherInfo);

document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        getWeatherInfo();
    }
});

function getWeatherInfo() {
    const city = document.getElementById('search').value;
    
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${APPID}`)
    .then(res => res.json())
    .then(data => {
console.log(data);
if(data.cod === 200){
    let name = data.name;
    let country = data.sys.country;
    let weather = data.weather[0].description;
    let temperature = Math.floor(data.main.temp - 273.15);
    let humidity = data.main.humidity;
    let date = new Date().getDate()
    let month = new Date().getMonth()
    let months =  ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let newMonth = months[month]
    let year = new Date().getFullYear()
    let day = new Date().getDay()
    let days =  ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let newDay = days[day]
    let windSpeed = data.wind.speed;
    let pressure = data.main.pressure

    
    let img;
    if (data.weather[0].main == 'Clouds' ) {
        img = 'https://cdn3.iconfinder.com/data/icons/weather-icons-2/64/Clouds-512.png';
    } else if (data.weather[0].main == 'Haze') {
        img = 'https://static-00.iconduck.com/assets.00/extreme-day-haze-icon-2048x1820-peahp82o.png';
    } else if (data.weather[0].main == 'Rain') {
        img = 'http://openweathermap.org/img/wn/10n@2x.png';
    } else if (data.weather[0].main == 'Snow') {
        img = 'http://openweathermap.org/img/wn/13n@2x.png';
    } else if (data.weather[0].main == 'Clear') {
        img = 'https://s3-alpha.figma.com/hub/file/2803345406/df2a8280-b65b-49da-b706-bed599bf2e0b-cover.png';
    } else if (data.weather[0].main == 'Storm') {
        img = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS78xkDGTM9F09qGCjqWkjg0_NpgHa8kISI5mAxmiCLJQ&s';
    }

    
    document.getElementById('result').innerHTML = `
    <h1 id='name'>${name}, ${country}</h1> 
    <p id='time'>${newDay}, ${date} ${newMonth} ${year}</p> 
    <img class='weatherImage' src=${img}> 
    <p id='temp'> ${temperature}°C</p> 
    <p class="weather">${weather}</p> 
    <div class='bottom-bar'>
        <h5>Wind<p>${windSpeed}km/h</p></h5>
        <h5>Pressure<p>${pressure}mbar</p></h5>
        <h5>Humidity<p>${humidity}%</p></h5>
    </div> 
            
    `;
} else {
    document.getElementById('result').innerHTML = `No data`;
}
})

    .catch(e => {
        console.log("error", e);
    });
}

