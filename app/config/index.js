const dotenv = require('dotenv');

if (process.env.NODE_ENV === undefined) {
	dotenv.config();
}

const {
	NODE_ENV: nodeEnv
} = process.env;

const config = {
	nodeEnv,
};

module.exports = config;