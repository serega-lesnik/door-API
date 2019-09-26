const TimesService = require('../services/times-service');

const getFormated = (date) => {
	const f = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`; // example: 9/26/2019
	return f;
}

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
		const currentDate = new Date();
		let {
			startDate,
			endDate
		} = ctx.query;

		endDate = endDate || getFormated(currentDate);
		
		startDate = startDate || getFormated(
			new Date(
				currentDate.setDate(currentDate.getDate() - 7) // one week ago
			)
		);
		
		const timesService = new TimesService(ctx.app.context);
		const data = await timesService.getTimesForAllUsers({ startDate, endDate });

		const body = {
			data,
			response: 'OK',
		};
		ctx.body = body;
		ctx.status = 200;
	}
};
