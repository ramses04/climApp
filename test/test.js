// Para este ejemplo, supondremos que tu código está en un archivo llamado weather.js

const { getCoordenadas, setDatosToday } = require('../index'); // Necesitarías exportar tus funciones para requerirlas en tus tests.

// Mocking fetch (para evitar llamadas reales a la API)
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({
      name: "Madrid",
      main: { temp: 25, temp_min: 23, temp_max: 27 },
      // ... otros campos necesarios
    }),
  })
);

describe('Weather Functions', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('fetches data for a given city', () => {
    getCoordenadas();
    
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(`https://api.openweathermap.org/data/2.5/weather?q=Madrid&units=metric&appid=4203c813e25b8d556c43f0c929952e33`);
  });

  // Puedes hacer más pruebas para `setDatosToday` y otras funciones, 
  // verificando que los datos se ajusten adecuadamente en el DOM, etc.

});
