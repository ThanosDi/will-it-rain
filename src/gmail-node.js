const nodemailer = require('nodemailer');
const {GMAIL_USERNAME, GMAIL_PASSWORD} = require('../env-vars');

const transporter = nodemailer.createTransport({
	host: 'smtp.gmail.com',
	auth: {
		type: 'login',
		user: GMAIL_USERNAME,
		pass: GMAIL_PASSWORD,
	},
});

const mailOptions = (to, subject, body) => ({
	from: `It will rain! <${GMAIL_USERNAME}>`,
	to,
	subject,
	html: body,
});

const sendEmail = (mailOptions) =>
	new Promise((resolve, reject) => {
		transporter.sendMail(mailOptions, (error, data) => {
			if (error) {
				reject(error);
			} else {
				resolve(data.response);
			}
		});
	});

module.exports = {
	sendEmail,
	mailOptions,
};
