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
		const deltaTime = `${diff.get('hours')}:${diff.get('minutes')}`;
		return {
			startTime: startTime.format('HH:mm'),
			endTime: endTime.format('HH:mm'),
			deltaTime,
			diff
		};
	}

	_reduceByUserAndDate(arr) {
		const unicUsers = new Set();
		const unicDates = new Set();
		const completteArr = arr.map(item => {
			item.date = item.readDate.substring(0, 10);
			item.moment = moment(item.readDate);
			unicUsers.add(item.consumerName);
			unicDates.add(item.date);
			return item;
		});
		const deltaAll = moment.duration(0);

		const usersArray = [...unicUsers].sort();
		const users = usersArray.map(user => {
			const usersFields = completteArr.filter(el => (
				el.consumerName === user
			));
			const userReduce = {
				consumerName: usersFields[0].consumerName,
				groupName: usersFields[0].groupName,
			};
			const deltaSum = moment.duration(0);

			unicDates.forEach(date => {
				const dateFields = usersFields.filter(el => (
					el.date === date
				));
				userReduce[date] = {}
				if (dateFields.length < 1) return;
				const miniMax = this._getMiniMaxDate(dateFields);
				deltaSum.add(miniMax.diff);
				delete miniMax.diff;
				userReduce[date] = { ...miniMax };
			})

			userReduce.deltaSum = `${Math.trunc(deltaSum.asHours())}:${deltaSum.get('minutes')}`;
			deltaAll.add(deltaSum);
			return userReduce;
		});
		return {
			dates: [...unicDates],
			users,
			deltaAll: `${Math.trunc(deltaAll.asHours())}:${deltaAll.minutes()}`,
		};
	}

	async getTimesForAllUsers({ startDate, endDate }) {

		const data = await this.timesModel.getTimesForAllUsers({ startDate, endDate });

		if (!Array.isArray(data)) {
			new Trown('Data from SQL is not Array');
		}

		return this._reduceByUserAndDate(data);
	}
}

module.exports = TimesService;
