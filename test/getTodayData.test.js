import { getTodayData } from '../js/getTodayData.js';

describe('getTodayData', () => {
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
    });

    it('Busca datos de la ciudad solicitada', async () => {

        fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve({
                    name: "valencia",
                    cod: '200',
                    main: {},
                }),
            })
        );
        const city = 'valencia';
        const result = await getTodayData(city, API_KEY);

        expect(fetch).toHaveBeenCalledWith(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`);
        expect(result.cod).toBe('200');
        expect(result.name).toBe(city);
    });

    it('Busca datos de la ciudad por defecto', async () => {

        fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve({
                    name: "Madrid",
                    cod: '200',
                    main: {},
                }),
            })
        );
        const city = '';
        const result = await getTodayData(city, API_KEY);

        expect(fetch).toHaveBeenCalledWith(`https://api.openweathermap.org/data/2.5/weather?q=Madrid&units=metric&appid=${API_KEY}`);
        expect(result.cod).toBe('200');

        expect(result.name).toBe("Madrid");
    });

    it('recibe error por ciudad erronea', async () => {
        fetch.mockResolvedValueOnce({
            json: () => Promise.resolve({ cod: '404' }),
        });

        const city = 'ciudadErronea';
        const result = await getTodayData(city, API_KEY);

        const errorElement = document.querySelector('#errorMsj');
        expect(errorElement.textContent.trim()).toBe(`No conozco la ciudad ciudadErronea :(`);
        const containerElement = document.querySelector('#error');
        expect(containerElement.classList.contains("showError"));

        expect(fetch).toHaveBeenCalledWith(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`);
        expect(result).toBe(undefined);
    });

    it('el fetch da un error', async () => {
        const city = 'ciudadErronea';
        const error = new Error('Error al procesar la respuesta');

        fetch.mockResolvedValueOnce({
            json: () => Promise.reject(error),
        });        

        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        
        await getTodayData(city, API_KEY);
        expect(consoleSpy).toHaveBeenCalledWith('Error al procesar la respuesta', expect.any(Error))
      });
});