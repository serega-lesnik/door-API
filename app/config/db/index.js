const dotenv = require('dotenv');
const accessConnection = require('./accessConnection');

if (process.env.NODE_ENV === undefined) {
	dotenv.config();
}

const {
	NODE_ENV: nodeEnv,
	PATH_TO_DB_FILE: pathToDbFile,
} = process.env;

const config = {
	nodeEnv,
	pathToDbFile,
};

console.log(pathToDbFile)

const db = accessConnection(config);



module.exports = db;