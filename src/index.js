const fetch = require('node-fetch');
const capitalize = require('capitalize');
const {OPEN_WEATHER_API_KEY, CITY_ID, NOTIFY_EMAILS} = require('../env-vars');
const {
	willItRain,
	getRecentWeatherInfo,
	saveWeather,
	readWeather,
	shouldNotify,
} = require('./tools');
const FILE = '../weather-result.json';
const {sendEmail, mailOptions} = require('./gmail-node');

const main = async () => {
	const weather = await fetch(
		`http://api.openweathermap.org/data/2.5/forecast?id=${CITY_ID}&APPID=${OPEN_WEATHER_API_KEY}`,
	).then((result) => result.json());
	if (willItRain(weather)) {
		const {description, main, icon} = getRecentWeatherInfo(weather);
		const file = await readWeather(FILE);
		const {timestamp} = JSON.parse(file);

		if (shouldNotify(timestamp)) {
			const email = mailOptions(
				NOTIFY_EMAILS,
				`WARNING: ${main} `,
				`<img src="https://openweathermap.org/img/w/${icon}.png"/> <br><br> ${capitalize(
					description,
				)}`,
			);
			await Promise.all([
				saveWeather(FILE, {description, main}),
				sendEmail(email),
			]);
		}
	} else {
		console.log('It will not rain in the near future.');
	}

	process.exitCode = 0;
};

try {
	main();
} catch (error) {
	console.log(error);
}
