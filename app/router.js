const Router = require('koa-router');
const timesController = require('./controllers/times-controller');

const router = new Router();

module.exports = router

	.get('/api/v1/times', timesController.getTimesForAllUsers)
	// .get('/api/v1/times/:userId', timesController.getTimesForAllUsers)
;