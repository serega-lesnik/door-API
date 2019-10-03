const moment = require('moment');
const TimesModel = require('../models/times-model');

class TimesService {
	constructor({ config, db }) {
		this.timesModel = new TimesModel(db);
		this.config = config;
	}

	_getMiniMaxDate(data) {
		const dates = data.map(item => item.moment);
		const startTime = moment.min(dates);
		const endTime = moment.max(dates);
	
		const diff = moment.duration(endTime.diff(startTime));
		const deltaTime = `${diff.get('hours')}:${diff.get('minutes')}`
		return {
			startTime: startTime.format('HH:mm'),
			endTime: endTime.format('HH:mm'),
			deltaTime
		};
	}

	_reduceByUserAndDate(arr) {
		const unicUsers = new Set();
		const unicDates = new Set();
		const completteArr = arr.map(item => {
			item.date = item.readDate.substring(0, 10);
			item.moment = moment(item.readDate);
			unicUsers.add(item.consumerNO);
			unicDates.add(item.date);
			return item;
		});

		const usersArray = [...unicUsers].sort();
		const users = usersArray.map(user => {
			const usersFields = completteArr.filter(el => (
				el.consumerNO === user
			));
			const userReduce = {
				consumerNO: usersFields[0].consumerNO,
				consumerName: usersFields[0].consumerName,
				groupName: usersFields[0].groupName,
			};

			unicDates.forEach(date => {
				const dateFields = usersFields.filter(el => (
					el.date === date
				));
				userReduce[date] = {}
				if (dateFields.length < 1) return;
				const miniMax = this._getMiniMaxDate(dateFields);
				userReduce[date] = { ...miniMax };
			})

			return userReduce;
		});
		return {
			dates: [...unicDates],
			users
		};
	}

	async getTimesForAllUsers({ startDate, endDate }) {

		const data = await this.timesModel.getTimesForAllUsers({ startDate, endDate });

		if (!Array.isArray(data)) {
			new Trown('Data from SQL is nit Array');
		}

		return this._reduceByUserAndDate(data);
	}
}

module.exports = TimesService;
