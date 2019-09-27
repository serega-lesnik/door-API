const Koa = require('koa');
const cors = require('@koa/cors');
const config = require('./config');
const router = require('./router');
const db = require('./config/db');

class App {
	constructor(port = 3000) {
		this.port = port;
		this.host = '0.0.0.0'
		this.server = null;
	}

	async start() {
		const app = new Koa();

		app.context.config = config;
		app.context.db = db;
		app.use(cors());
		app.use(router);

		this.server = await new Promise((resolve, reject) => {
			const srv = app.listen(this.port, this.host);

			srv.on('listening', () => {
				resolve(srv);
			});

			srv.on('error', (err) => {
				reject(err);
			});
		});
		console.log(`Server started on http://${this.host}:${this.port}`);
	}

	async close() {
		await new Promise((resolve, reject) => {
			this.server.close((err) => {
			if (err) {
				reject(err);
			}

			  resolve();
			});
		});

		await this.context.knex.destroy();
		console.log(`Server stoped on http://localhost:${this.port}`);
	}
}

module.exports = App;
