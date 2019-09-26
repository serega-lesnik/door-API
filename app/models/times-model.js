const Model = require('./model');

class TimesModel extends Model {
	async getTimesForAllUsers() {
		const times = await this.query('simple.sql');
		return times;
	}
}

module.exports = TimesModel;
