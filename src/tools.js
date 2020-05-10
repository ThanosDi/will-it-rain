const {
	pipe,
	__,
	head,
	propOr,
	allPass,
	gte,
	lte,
	lensPath,
	view,
} = require('ramda');
const {differenceInHours} = require('date-fns');
const fs = require('fs').promises;
const {NOTIFY_AGAIN_AFTER} = require('../env-vars');

const saveWeather = async (file, weather) => {
	const timestamp = Date.now();
	const data = JSON.stringify({...weather, timestamp});
	return fs.writeFile(file, data);
};

const readWeather = async (file) => fs.readFile(file);
const getRecentWeatherId = pipe(
	propOr([], ['list']),
	head,
	propOr([], ['weather']),
	head,
	propOr(0, ['id']),
);

const recentWeatherInfoLens = lensPath(['list', 0, 'weather', 0]);

const getRecentWeatherInfo = view(recentWeatherInfoLens);

const willItRain = pipe(
	getRecentWeatherId,
	allPass([gte(__, 200), lte(__, 531)]), // List of weather code https://openweathermap.org/weather-conditions
);

const shouldNotify = (past) =>
	differenceInHours(Date.now(), past) > NOTIFY_AGAIN_AFTER;

module.exports = {
	getRecentWeatherId,
	willItRain,
	getRecentWeatherInfo,
	saveWeather,
	readWeather,
	shouldNotify,
};
