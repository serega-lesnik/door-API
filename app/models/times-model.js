const Model = require('./model');


class TimesModel extends Model {
	async getTimesForAllUsers(payload) {
		const query = require('./sql/getTimesForAllUsers')(payload);
		
		const times = await this.query(query);
		return times;
	}
}

module.exports = TimesModel;
