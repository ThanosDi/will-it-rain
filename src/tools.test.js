const {unlinkSync} = require('fs');
const weatherResponseFixture = require('./fixtures/weather-response-sample');

const {
	getRecentWeatherId,
	willItRain,
	getRecentWeatherInfo,
	saveWeather,
	readWeather,
	shouldNotify,
} = require('./tools');
const FILE_TEST = './src/fixtures/weather-result.json';

afterAll(() => {
	unlinkSync('./src/fixtures/weather-result.json');
});
describe('parse weather data', () => {
	test('get most recent weather id', () => {
		const id = getRecentWeatherId(weatherResponseFixture);
		expect(id).toEqual(202);
	});

	test('willItRain', () => {
		expect(willItRain(weatherResponseFixture)).toBeTruthy(); // Light rain
	});

	test('getRecentWeatherInfo', () => {
		const result = getRecentWeatherInfo(weatherResponseFixture);
		expect(result).toEqual({
			id: 202,
			main: 'Clouds',
			description: 'scattered clouds',
			icon: '03d',
		});
	});

	test('saveWeather and readWeather', async () => {
		const result = getRecentWeatherInfo(weatherResponseFixture);
		try {
			await saveWeather(FILE_TEST, result);
			const file = await readWeather(FILE_TEST);
			const weather = JSON.parse(file);
			expect(weather.id).toEqual(202);
			expect(weather.timestamp).toBeTruthy();
		} catch (error) {
			console.log(error);
		}
	});

	test('shouldNotify', () => {
		const now = Date.now();

		const hours13Back = now - 46800000;
		const hours11Back = now - 39600000;

		const expectTrue = shouldNotify(hours13Back);
		const expectFalse = shouldNotify(hours11Back);
		expect(expectTrue).toBe(true);
		expect(expectFalse).toBe(false);
	});
});
