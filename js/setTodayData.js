async function setTodayData(data) {   
    try {
        const sunrise = new Date(data.sys.sunrise * 1000);
        const sunset = new Date(data.sys.sunset * 1000);
        const weatherIcon = data.weather[0].main;
    
        document.querySelector('#cityMain').innerHTML = data.name;
        document.querySelector('#tempMain').innerHTML = Math.round(data.main.temp) + " °";
        document.querySelector('#tempMinMain').innerHTML = Math.round(data.main.temp_min) + " °";
        document.querySelector('#tempMaxMain').innerHTML = Math.round(data.main.temp_max) + " °";
        document.querySelector('#weatherImgMain').src = `assets/images/${weatherIcon}.png`;
        document.querySelector('#humidityMain').innerHTML = data.main.humidity + " %";
        document.querySelector('#windMain').innerHTML = Math.round(data.wind.speed) + " km/h";
        document.querySelector('#sunriseMain').innerHTML = sunrise.getHours() + ":" + (sunrise.getMinutes() < 10 ? '0' + sunrise.getMinutes() : sunrise.getMinutes());
        document.querySelector('#sunsetMain').innerHTML = sunset.getHours() + ":" + (sunset.getMinutes() < 10 ? '0' + sunset.getMinutes() : sunset.getMinutes());
    } catch (error) {
        console.error('Error al establecer los datos del día para la ciudad: ', error);
    }
}

export { setTodayData };