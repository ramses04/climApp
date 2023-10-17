import { getTodayData } from '../js/getTodayData.js';
import { setTodayData } from '../js/setTodayData.js';
import { getWeekData } from '../js/getWeekData.js';
import { setWeekData } from '../js/setWeekData.js';

const API_KEY = "4203c813e25b8d556c43f0c929952e33";
const error = document.querySelector('#error');
const searchBox = document.querySelector('#searchBox');
const favCity = document.querySelector('#favCity');
const searchBtn = document.querySelector('#searchBtn');

window.onload = init();

function init() {
    searchBox.value = "";
    manageData();
}

async function manageData() {
    const city = searchBox.value;
    try {
        const todayData = await getTodayData(city, API_KEY);
        setTodayData(todayData);
        console.log(todayData)
        const weekData = await getWeekData(todayData, API_KEY);
        setWeekData(weekData);
        console.log(weekData)
    } catch (error) {
        console.error(`Fallo buscando los datos de la ciudad: ${city}` , error);
    }
}

searchBtn.addEventListener('click', () => {
    manageData();
});

searchBox.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        manageData();
    }
});

document.querySelector('#closeError').addEventListener('click', () => {
    error.classList.replace('showError', 'hideError');
});

favCity.addEventListener('click', () => {
    if (favCity.classList.contains('favEmpty')) {
        favCity.innerHTML = `<img src="assets/images/starFilled.png" class="mx-auto d-block" alt="favoritos">`;
        favCity.classList.replace('favEmpty', 'favFilled');
    } else if (favCity.classList.contains('favFilled')) {
        favCity.innerHTML = `<img src="assets/images/star.png" class="mx-auto d-block" alt="favoritos"></img>`
        favCity.classList.replace('favFilled', 'favEmpty');
    }
});