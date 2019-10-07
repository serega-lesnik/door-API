const moment = require('moment');
const TimesModel = require('../models/times-model');
const {
	STATUS_OF_COME: {
		NONE,
		FIRST,
		LAST,
		FIRST_AND_LAST,
	}
} = require('../constants');

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
		return {
			startTime,
			endTime,
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

		const miniMaxAll = {};
		unicDates.forEach(date => {
			const dateFields = completteArr.filter(el => (
				el.date === date
			));
			miniMaxAll[date] = this._getMiniMaxDate(dateFields);
		});

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

				const { startTime, endTime, diff } = this._getMiniMaxDate(dateFields);
				deltaSum.add(diff);

				userReduce[date] = {
					startTime: startTime.format('HH:mm'),
					endTime: endTime.format('HH:mm'),
					deltaTime: `${diff.get('hours')}:${diff.get('minutes')}`,
					statusOfCome: NONE,
				};

				// Set status:
				if (startTime.isSame(miniMaxAll[date].startTime)) {
					userReduce[date].statusOfCome = FIRST;
				}
				if (endTime.isSame(miniMaxAll[date].endTime)) {
					if (userReduce[date].statusOfCome === NONE) {
						userReduce[date].statusOfCome = LAST;
					} else {
						userReduce[date].statusOfCome = FIRST_AND_LAST;
					}
				}
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
