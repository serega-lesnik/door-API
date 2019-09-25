
module.exports = {
	async getTimesForAllUsers(ctx) {
		console.log('--- controller:', ctx)

		const body = {
			response: 'OK'
		};
		ctx.body = body;
		ctx.status = 200;
	}
}