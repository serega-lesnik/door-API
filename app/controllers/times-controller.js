const moment = require('moment');
const TimesService = require('../services/times-service');

const { HTTP_STATUS_CODES } = require('../constants');
const {
	OK,
	NO_CONTENT,
	UNAUTHORIZED,
	BAD_REQUEST,
	CONFLICT,
} = HTTP_STATUS_CODES;

const DATE_FORMAT_FOR_QUERY = 'YYYY-MM-DD';

const dateValidator = ctx => {
	let {
		startDate = null,
		endDate = null,
	} = ctx.query;

	if (endDate === null) {
		endDate = moment();
	} else {
		endDate = moment(endDate);
		if (!endDate.isValid()) {
			ctx.checkQuery('endDate').addError('endDate is not a date format.');
			return false;
		}
	}

	if (startDate === null) {
		startDate = moment(endDate).subtract(1, 'weeks');
	} else {
		startDate = moment(startDate);
		if (!startDate.isValid()) {
			ctx.checkQuery('startDate').addError('startDate is not a date format.');
			return false;
		}
	}

	if (!startDate.isSameOrBefore(endDate)) {
		ctx.checkQuery('startDate').addError('startDate must be before or the same to the endDate');
		return;
	}

	return {
		startDate: startDate.format(DATE_FORMAT_FOR_QUERY),
		endDate: endDate.format(DATE_FORMAT_FOR_QUERY)
	}

	ctx.query.startDate = startDate.format(DATE_FORMAT_FOR_QUERY);
	ctx.query.endDate = endDate.format(DATE_FORMAT_FOR_QUERY);
}

module.exports = {

	/**
	 * get times for All Users
	 *
	 * last week: curl 'http://127.0.0.1:3000/api/v1/times'
	 *    with period: 'http://127.0.0.1:3000/api/v1/times?startDate=2019-09-01&endDate=2019-09-30'
	 *
	 */
	async getTimesForAllUsers(ctx) {
		console.log('>>> GET',moment().format('YYYY-MM-DD HH:mm:ss'), 'query:', ctx.query)

		const body = {
			data: null,
			errors: null,
			response: false,
		};

		const payload = dateValidator(ctx, ctx.query);

		if (ctx.errors || !payload) {
			console.log('--- !!! Bad Request !!!\n');
			body.errors = ctx.errors || true;
			ctx.body = body;
			ctx.status = BAD_REQUEST;
			return;
		}

		const {
			startDate,
			endDate,
		} = payload;

		console.log('<<< payload:', { startDate, endDate }, '\n');

		const timesService = new TimesService(ctx.app.context);
		const data = await timesService.getTimesForAllUsers({ startDate, endDate });

		if (!Array.isArray(data)) {
			console.log('--- !!! No Content !!!\n');
			body.error = {
				noContent: 'Internal Server Error'
			};
			ctx.body = body;
			ctx.status = CONFLICT;
			return;
		}

		body.data = data;
		body.response = true;

		ctx.body = body;
		ctx.status = OK;
	}
};
