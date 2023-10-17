async function getTodayData(value,API_KEY) {
    let city = value;
    if (city === '') {
        city = "Madrid";
    };
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`);
    try {
        const json = await response.json();        
        if (json.cod == '404') {
            document.querySelector('#errorMsj').innerHTML = `
                    No conozco la ciudad ${city} :(
                    `;
            document.querySelector('#error').classList.replace('hideError', 'showError');
            return;
        } else {
            return json;
        }
    } catch (error) {
        console.error("Error al procesar la respuesta", error);
    };
}

export{getTodayData};