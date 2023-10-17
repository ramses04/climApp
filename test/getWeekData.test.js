import { getWeekData } from '../js/getWeekData';

global.fetch = jest.fn();

describe('getWeekData', () => {
    const API_KEY = "apiKey";
    beforeEach(() => {
        document.body.innerHTML = `
        <div id="error" class="msjError hideError">
            <div class="alert alert-danger mb-0 fade show" role="alert">
                <p id="errorMsj" class="py-0 my-0">No conozco la ciudad :(</p>
                <button id="closeError" type="button" class="close cerrarError" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        </div>
        `;
        fetch.mockClear();
    });

    it('Busca datos de la ciudad solicitada', async () => {
        fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve({
                    cod: '200',
                    list: [
                        {
                            dt: 1697544000,
                            main: {
                                temp_min: 19.4,
                                temp_max: 22.16,
                            },
                            weather: [
                                {
                                    main: "Rain"
                                }
                            ]
                        },
                        {
                            dt: 1697554800,
                            main: {
                                temp_min: 21.29,
                                temp_max: 22.92,
                            },
                            weather: [
                                {
                                    main: "Rain",
                                }
                            ]
                        }
                    ],
                }),
            })
        );

        const fakeCoord = {
            coord: {
                lon: -3.7026,
                lat: 40.4165
            }
        };
        const result = await getWeekData(fakeCoord, API_KEY);
        const lat = fakeCoord.coord.lat;
        const lon = fakeCoord.coord.lon;

        expect(fetch).toHaveBeenCalledWith(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`);
        expect(result.cod).toBe('200');
    });

    it('Prueba error por coordenadas vacías', async () => {
        fetch.mockResolvedValueOnce({
            json: () => Promise.resolve({ cod: '404' }),
        });

        const data = undefined;
        await getWeekData(data, API_KEY);

        const errorElement = document.querySelector('#errorMsj');
        expect(errorElement.textContent.trim()).toBe(`Ha ocurrido un error :(`);
        const containerElement = document.querySelector('#error');
        expect(containerElement.classList.contains("showError"));
    });

    it('Prueba error por coordenadas erroneas', async () => {
        fetch.mockResolvedValueOnce({
            json: () => Promise.resolve({ cod: '404' }),
        });

        const fakeCoord = {
            coord: {
                lon: -99.999999999999999,
                lat: 9.999999999999999
            }
        };
        const result = await getWeekData(fakeCoord, API_KEY);
        const lat = fakeCoord.coord.lat;
        const lon = fakeCoord.coord.lon;

        expect(fetch).toHaveBeenCalledWith(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`);
        expect(result).toBe(undefined);
    });

    it('el fetch da un error', async () => {
        const fakeCoord = {
            coord: {
                lon: -3.7026,
                lat: 40.4165
            }
        };

        const mockResponse = {
            json: jest.fn().mockRejectedValue(new Error('Error al procesar la respuesta'))
        };

        global.fetch = jest.fn().mockResolvedValueOnce(mockResponse);
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });

        await getWeekData(fakeCoord, API_KEY);
        expect(consoleSpy).toHaveBeenCalledWith('Error al procesar la respuesta', expect.any(Error));
    });
});
