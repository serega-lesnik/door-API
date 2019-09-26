const Model = require('./model');


class TimesModel extends Model {
	async getTimesForAllUsers(payload) {
		const query = require('./sql/simple')(payload);
		
		const times = await this.query(query);
		// const times = await this.query('simple.sql');
		return times;
	}
}

module.exports = TimesModel;
