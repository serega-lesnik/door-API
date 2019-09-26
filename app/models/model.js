require('require-sql');

const SQL_STRING = 'sqlString';
const SQL_FILE = 'sqlFile';

class Model {
	constructor(db) {
		this.db = db;
	}

	async query(query) {
		
		const queryType = query.indexOf('\.sql') < 0 ? SQL_STRING : SQL_FILE;
		switch (queryType) {
			case SQL_FILE:
				try {
					query = require(`./sql/${query}`);
				} catch (error) {
					console.error('>>>FAIL: read SQL File: ' + query, error);
				}
				break;
			default:
				break;
		}
		try {
			return await this.db.query(query);
		} catch (error) {
			console.error('>>>FAIL: query to DB', error);
		}
	}
}

module.exports = Model;
