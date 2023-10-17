async function getWeekData(datosCoord, API_KEY) {
    if (datosCoord != undefined) {
        const lat = datosCoord.coord.lat;
        const lon = datosCoord.coord.lon;

        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`);
        try {
            const json = await response.json();
            if (json.cod != '404')
                return json;
        } catch (error) {
            console.error("Error al procesar la respuesta", error);
        }
    } else {
        document.querySelector('#errorMsj').innerHTML = `
                Ha ocurrido un error :(
                 `;
        document.querySelector('#error').classList.replace('hideError', 'showError');
        return;
    }

};

export { getWeekData };