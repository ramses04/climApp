import { setWeekData } from '../js/setWeekData';

describe('setWeekData', () => {

    beforeEach(() => {
        document.body.innerHTML = `
            <div id="forecastItems"></div>
        `;
    });

    it('llena los datos correctamente', async () => {

        const mockData = {
            list: [
                {
                    dt_txt: '2023-10-18 12:00:00',
                    dt: 1697630400,
                    weather: [{ main: "Primero" }],
                    main: {tempMin: 17,tempMax: 21}
                },
                {
                    dt_txt: '2023-10-19 12:00:00',
                    dt: 1697716800,
                    weather: [{ main: "Segundo" }],
                    main: {tempMin: 13,tempMax: 17}
                },
                {
                    dt_txt: '2023-10-20 12:00:00',
                    dt: 1697803200,
                    weather: [{ main: "Tercero" }],
                    main: {tempMin: 13,tempMax: 17}
                },
                {
                    dt_txt: '2023-10-21 12:00:00',
                    dt: 1697889600,
                    weather: [{ main: "Cuarto" }],
                    main: {tempMin: 11.99,tempMax: 17.01}
                },
                {
                    dt_txt: '2023-10-21 15:00:00',
                    dt: 1697900400,
                    weather: [{ main: "Quinto" }],
                    main: {tempMin: 13,tempMax: 17}
                }
            ]
        };
        await setWeekData(mockData);

        const forecastContent = document.querySelector('#forecastItems').innerHTML;
        expect(forecastContent).toContain('Primero' && 'Segundo' && 'Tercero' && 'Cuarto');
    });

    it('no llega la data correctamente', async () => {
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });

        await setWeekData();
        expect(consoleSpy).toHaveBeenCalledWith('Error al establecer los datos del día para la ciudad: ', expect.any(Error));
    });
})