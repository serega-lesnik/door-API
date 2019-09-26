const TimesService = require('../services/times-service');

module.exports = {
	async getTimesForAllUsers(ctx) {
		console.log('--- controller:', ctx.query)

		const timesService = new TimesService(ctx.app.context);
		const data = await timesService.getTimesForAllUsers();

		const body = {
			data,
			response: 'OK',
		};
		ctx.body = body;
		ctx.status = 200;
	}
};
