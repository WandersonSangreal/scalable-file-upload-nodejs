const {promisify} = require('util');
const {pipeline} = require('stream');
const pipelineAsync = promisify(pipeline);

const logger = require('pino')({
	prettyPrint: {
		ignore: 'pid,hostname'
	}
});

module.exports = {
	logger,
	pipelineAsync,
	promisify
}
