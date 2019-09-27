const TimesService = require('../services/times-service');

const { HTTP_STATUS_CODES } = require('../constants');
const {
	OK,
	NO_CONTENT,
	UNAUTHORIZED,
	BAD_REQUEST,
	CONFLICT,
} = HTTP_STATUS_CODES;

const getFormated = date => {
	const f = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`; // example: 2019-9-26
	return f;
}

const stringIsValidDate = str => {
	const date = Date.parse(str);
	return !Number.isNaN(date);
}

const consistentDates = (start, end) => (
	Date.parse(start) <=  Date.parse(end)
);

module.exports = {

	/**
	 * get times for All Users
	 *
	 * last week: curl 'http://127.0.0.1:3000/api/v1/times'
	 *    with period: 'http://127.0.0.1:3000/api/v1/times?startDate=2019-09-01&endDate=2019-09-30'
	 *
	 */
	async getTimesForAllUsers(ctx) {
		console.log('--- controller:', ctx.query)
		const body = {};
		const currentDate = new Date();
		let {
			startDate,
			endDate
		} = ctx.query;

		endDate = stringIsValidDate(endDate) ? endDate : getFormated(currentDate);
		
		startDate = stringIsValidDate(startDate)
			? startDate 
			: getFormated(new Date(
				currentDate.setDate(currentDate.getDate() - 7) // one week ago
			));

		if (!consistentDates(startDate, endDate)) {
			body.data = [];
			body.response = 'Error';
			ctx.body = body;
			ctx.status = BAD_REQUEST;
			return;
		}
		const timesService = new TimesService(ctx.app.context);

		const data = await timesService.getTimesForAllUsers({ startDate, endDate });

		if (!Array.isArray(data)) {
			body.data = [];
			body.response = 'Error';
			ctx.body = body;
			ctx.status = NO_CONTENT;
			return;
		}
		body.data = data;
		body.response = 'OK';

		ctx.body = body;
		ctx.status = OK;
	}
};
