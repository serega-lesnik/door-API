const moment = require('moment');
const TimesModel = require('../models/times-model');

class TimesService {
	constructor({ config, db }) {
		this.timesModel = new TimesModel(db);
		this.config = config;
	}

	_getMiniMaxDate(data) {
		const dates = data.map(item => item.moment);
		const miniMax = {
			startTime: moment.min(dates),
			endTime: moment.max(dates),
		};
	
		const diff = moment.duration(miniMax.endTime.diff(miniMax.startTime));
		miniMax.deltaTime = `${diff.get('hours')}:${diff.get('minutes')}:${diff.get('seconds')}`
		return miniMax;
	}

	_reduceByUserAndDate(arr) {
		const unicSignatures = new Set();
		const completteArr = arr.map(item => {
			item.date = item.readDate.substring(0, 10);
			const signature = `${item.date}|${item.consumerNO}`;
			item.signature = signature;
			item.moment = moment(item.readDate);
			unicSignatures.add(signature);
			return item;
		});

		const res = [];
		unicSignatures.forEach(signature => {
			const usersFields = completteArr.filter(el => (
				el.signature === signature
			));
			const miniMax = this._getMiniMaxDate(usersFields);
			res.push({
				consumerNO: usersFields[0].consumerNO,
				consumerName: usersFields[0].consumerName,
				groupName: usersFields[0].groupName,
				date: usersFields[0].date,
				...miniMax,
			});
		});
		return res;
	}

	async getTimesForAllUsers({ startDate, endDate }) {

		const data = await this.timesModel.getTimesForAllUsers({ startDate, endDate });

		if (!Array.isArray(data)) {
			return null;
		}

		return this._reduceByUserAndDate(data);
	}
}

module.exports = TimesService;
