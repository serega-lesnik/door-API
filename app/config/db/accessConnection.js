const ADODB = require('node-adodb');

module.exports = ({ pathToDbFile }) => {
	try {
		return ADODB.open(`Provider=Microsoft.Jet.OLEDB.4.0;Data Source=${pathToDbFile.toString()};`);
	} catch(error) {
		console.error('>>>FAIL: connect to MS Access DB:', error);
	}
};
