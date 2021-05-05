const {promisify} = require('util');
const {pipeline} = require('stream');

const logger = require('pino')({
	prettyPrint: {
		ignore: 'pid,hostname'
	}
});

module.exports = {
	logger
}
