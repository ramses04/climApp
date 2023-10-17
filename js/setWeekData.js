async function setWeekData(data) {
    const dias = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
    let forecastsSum = "";
    let auxIdx = 0;
    try {
        const forecastItems = document.querySelector('#forecastItems');
        data.list.forEach((measure) => {
            const measureHour = (measure.dt_txt).slice(11, 13);

            if (measureHour === "12" && auxIdx < 4) {
                const day = new Date(measure.dt * 1000).getDay();
                const weatherIcon = measure.weather[0].main;
                //por motivos esteticos hacemos cambios a los valores ya que ambos nos llegan iguales desde la API
                const tempMin = Math.round(measure.main.temp_min) - 2;
                const tempMax = Math.round(measure.main.temp_max) + 2;

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
    } catch (error) {
        console.error('Error al establecer los datos del día para la ciudad: ', error);
    }
};

export { setWeekData };