const Koa = require('koa');
const router = require('./router');

class App {
	constructor(port = 3000) {
		this.port = port;
		this.server = null;
	}

	async start() {
		const app = new Koa();

		app
			// .use(router.route)
			// .use(router.allowedMethods());
			.use(ctx => {
				const body = {
					response: 'OK'
				};
				ctx.body = body;
				ctx.status = 200;
				console.log(ctx);
			})

		this.server = await new Promise((resolve, reject) => {
			const srv = app.listen(this.port);

			srv.on('listening', () => {
				resolve(srv);
			});
	  
			srv.on('error', (err) => {
				reject(err);
			});
		});
		console.log(`Server started on http://localhost:${this.port}`);
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
