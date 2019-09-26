const TimesModel = require('../models/times-model');

class TimesService {
	constructor({ config, db }) {
		this.timesModel = new TimesModel(db);
		this.config = config;
	}

	async getTimesForAllUsers(payload) {
		const data = await this.timesModel.getTimesForAllUsers(payload);
		return data;
	}
}

module.exports = TimesService;
