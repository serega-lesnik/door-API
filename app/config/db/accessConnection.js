const ADODB = require('node-adodb');

module.exports = ({ pathToDbFile }) => {
	const path = pathToDbFile.toString()
	try {
		return ADODB.open(`Provider=Microsoft.Jet.OLEDB.4.0;Data Source=${path};`);
	} catch(error) {
		console.error('>>>FAIL: connect to MS Access DB:', error);
	}
};
