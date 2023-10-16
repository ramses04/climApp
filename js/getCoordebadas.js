function getCoordenadas(value) {
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