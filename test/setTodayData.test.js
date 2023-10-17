import { setTodayData } from '../js/setTodayData';

describe('setTodayData', () => {

    beforeEach(() => {
        document.body.innerHTML = `
            <div id="cityMain"></div>
            <div id="tempMain"></div>
            <div id="tempMinMain"></div>
            <div id="tempMaxMain"></div>
            <img id="weatherImgMain" src=""/>
            <div id="humidityMain"></div>
            <div id="windMain"></div>
            <div id="sunriseMain"></div>
            <div id="sunsetMain"></div>
        `;
    });

    it('llena los datos correctamente con fechas de menos de 10 minutos', async () => {
        const data = {
            weather: [{
                main: "Clouds"
            }],
            main: {
                temp: 1,
                temp_min: 19.31,
                temp_max: 20.77,
                humidity: 4,
            },
            wind: {
                speed: 5
            },
            sys: {
                sunrise: 1697524027,
                sunset: 1697563982
            },
            name: "Madrid"
        }

        await setTodayData(data);

        expect(document.querySelector('#cityMain').textContent).toBe("Madrid");
        expect(document.querySelector('#tempMain').textContent).toBe("1 °");
        expect(document.querySelector('#tempMinMain').textContent).toBe("19 °");
        expect(document.querySelector('#tempMaxMain').textContent).toBe("21 °");
        expect(document.querySelector('#weatherImgMain').src).toContain("assets/images/Clouds.png");
        expect(document.querySelector('#humidityMain').textContent).toBe("4 %");
        expect(document.querySelector('#windMain').textContent).toBe("5 km/h");
        expect(document.querySelector('#sunriseMain').textContent).toBe("8:27");
        expect(document.querySelector('#sunsetMain').textContent).toBe("19:33");
    });

    it('llena los datos correctamente con fechas de mas de 10 minutos', async () => {
        const data = {
            weather: [{
                main: "Clouds"
            }],
            main: {
                temp: 1,
                temp_min: 19.31,
                temp_max: 20.77,
                humidity: 4,
            },
            wind: {
                speed: 5
            },
            sys: {
                sunrise: 1697522827,
                sunset: 1697562182
            },
            name: "Madrid"
        }

        await setTodayData(data);

        expect(document.querySelector('#sunriseMain').textContent).toBe("8:07");
        expect(document.querySelector('#sunsetMain').textContent).toBe("19:03");
    });

    it('no llega la data correctamente', async () => {
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });

        await setTodayData();
        expect(consoleSpy).toHaveBeenCalledWith('Error al establecer los datos del día para la ciudad: ', expect.any(Error));
    });
})