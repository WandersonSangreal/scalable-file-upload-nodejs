const {pipelineAsync, logger} = require('./helpers');
const UploaderService = require('./uploader.service');

class Routes {

	#io

	constructor(io) {

		this.#io = io;

	}

	options(request, response) {
		response.writeHead(204, {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'OPTIONS,POST',
		});
		response.end();
	}

	async post(request, response) {

		const {headers} = request;
		const {searchParams} = new URL(request.url, headers.origin);

		// this.#io.to(searchParams.get('io')).emit('teste', 'teste');

		const uploadService = new UploaderService(this.#io, searchParams.get('io'));

		const onFinish = (request, response) => () => {

			response.writeHead(303, {
				Connection: 'close',
				Location: '/'
			});

			response.end();

		}

		const busboy = uploadService.regiterEvents(headers, onFinish(request, response));

		await pipelineAsync(request, busboy);

		logger.info('request finished successfully');

	}

}

module.exports = Routes;
