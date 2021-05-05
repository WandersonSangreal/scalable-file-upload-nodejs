const url = require('url');

class Routes {

	#io

	constructor(io) {

		this.#io = io;

	}

	async post(request, response) {

		const {headers} = request;
		const {searchParams} = new URL(request.url, headers.origin);

		this.#io.to(searchParams.get('io')).emit('teste', 'teste');

		const onFinish = (response, redirectTo) => {

			response.writeHead(303, {
				Connection: 'close',
				Location: redirectTo
			});

			response.end();

		}

		return onFinish(response, headers.origin);

	}

}

module.exports = Routes;
