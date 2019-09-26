const TimesModel = require('../models/times-model');

class TimesService {
	constructor({ config, db }) {
		this.timesModel = new TimesModel(db);
		this.config = config;
	}

	async getTimesForAllUsers() {
		const data = await this.timesModel.getTimesForAllUsers();
		return data;
	}
}

module.exports = TimesService;
