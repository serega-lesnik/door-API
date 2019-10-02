const ADODB = require('node-adodb');

module.exports = ({ pathToDbFile, dbPassword }) => {
	const path = pathToDbFile.toString()
	let provider = 'Provider=Microsoft.Jet.OLEDB.4.0;';
	provider += `Data Source=${path};`;
	provider += `Jet OLEDB:Database Password=${dbPassword};`;
	try {
		return ADODB.open(provider);
	} catch(error) {
		console.error('>>>FAIL: connect to MS Access DB:', error);
	}
};
