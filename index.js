const API_KEY = "4203c813e25b8d556c43f0c929952e33";

const error = document.querySelector('#error');
const errorMsj = document.querySelector('#errorMsj');
const navTogller = document.querySelector('#navTogller');
const searchBox = document.querySelector('#searchBox');
const favCity = document.querySelector('#favCity');
const searchBtn = document.querySelector('#searchBtn');
const dias = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];

window.onload = init();

function init() {
    searchBox.value = "";
    getCoordenadas();
}

searchBtn.addEventListener('click', () => {
    getCoordenadas();
});

searchBox.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        getCoordenadas();
    }
});

function getCoordenadas() {
    let city = searchBox.value;
    if (city === '') {
        city = "Madrid";
    };
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`)
        .then(response => response.json())
        .then(json => {

            if (json.cod === '404') {
                errorMsj.innerHTML = `
                <p id="errorMsj" class="py-0 my-0">No conozco la ciudad ${city} :(</p>
                `;
                error.classList.replace('hideError', 'showError');
                return;
            } else {
                setTimeout(setDatosToday(json), 500);
                setTimeout(getDatosWeek(json.coord.lat, json.coord.lon), 500);
            };
        });
};

function setDatosToday(json) {
    const sunrise = new Date(json.sys.sunrise * 1000);
    const sunset = new Date(json.sys.sunset * 1000);
    const weatherIcon = json.weather[0].main;

    document.querySelector('#cityMain').innerHTML = json.name;
    document.querySelector('#tempMain').innerHTML = Math.round(json.main.temp) + " °";
    document.querySelector('#tempMinMain').innerHTML = Math.round(json.main.temp_min) + " °";
    document.querySelector('#tempMaxMain').innerHTML = Math.round(json.main.temp_max) + " °";
    document.querySelector('#weatherImgMain').src = `assets/images/${weatherIcon}.png`;
    document.querySelector('#humidityMain').innerHTML = json.main.humidity + " %";
    document.querySelector('#windMain').innerHTML = Math.round(json.wind.speed) + " km/h";
    document.querySelector('#sunriseMain').innerHTML = sunrise.getHours() + ":" + (sunrise.getMinutes() < 10 ? '0' + sunrise.getMinutes() : sunrise.getMinutes());
    document.querySelector('#sunsetMain').innerHTML = sunset.getHours() + ":" + (sunset.getMinutes() < 10 ? '0' + sunset.getMinutes() : sunset.getMinutes());
};

function getDatosWeek(lat, lon) {
    fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`)
        .then(response => response.json())
        .then(json => {
            if (json.cod === '404') {
                errorMsj.innerHTML = `
                 <p id="errorMsj" class="py-0 my-0">Ha ocurrido un error :(</p>
                 `;
                error.classList.replace('hideError', 'showError');
                return;
            } else {
                setTimeout(setDatosWeek(json), 500);
            };
        });
};

function setDatosWeek(json) {
    const forecastItems = document.querySelector('#forecastItems');
    let forecastsSum = "";
    let auxIdx = 0;

    json.list.forEach((measure) => {
        const measureHour = (measure.dt_txt).slice(11, 13);

        if (measureHour === "12" && auxIdx < 4) {
            const day = new Date(measure.dt * 1000).getDay();
            const weatherIcon = measure.weather[0].main;
            //por motivos esteticos hacemos cambios a los valores ya que ambos nos llegan iguales desde la API
            const tempMin = Math.round(measure.main.temp_min)-2;
            const tempMax = Math.round(measure.main.temp_max)+2;

            forecastsSum += `
            <div class="col-12 col-sm-3 px-1 py-1">
                <div class="item-pronostico">
                    <h4>${dias[day]}</h4>
                    <div class="row mt-3 mt-sm-0">
                        <div class="col-6 col-sm-12">
                            <img src="assets/images/${weatherIcon}.png" class="d-block mx-auto pb-3 pt-2 imgCard"
                                alt="imagen clima">
                        </div>
                        <div class="col-6 col-sm-12 pt-3 pt-sm-0">
                            <h5>min: ${tempMin} °C</h5>
                            <h5>max: ${tempMax} °C</h5>
                        </div>
                    </div>
                </div>
            </div>        
            `;
            auxIdx++;
        };
    });

    forecastItems.innerHTML = forecastsSum;
};

document.querySelector('#closeError').addEventListener('click', () => {
    error.classList.replace('showError', 'hideError');
});

favCity.addEventListener('click', () => {
    if (favCity.classList.contains('favEmpty')) {
        favCity.innerHTML = `<img src="assets/images/starFilled.png" class="mx-auto d-block" alt="favoritos">`;
        favCity.classList.replace('favEmpty', 'favFilled');
    } else if (favCity.classList.contains('favFilled')){
        favCity.innerHTML = `<img src="assets/images/star.png" class="mx-auto d-block" alt="favoritos"></img>`
        favCity.classList.replace('favFilled', 'favEmpty');
    }
});

module.exports = getCoordenadas;