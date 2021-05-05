const http = require('http');
const port = 3000;

const handler = (request, response) => {

	const main = async (request, response) => response.end('OK');

	return main(request, response);

}

const server = http.createServer(handler);

const startServer = _ => {
	console.log(`app running at http://127.0.0.1:${port}`);
}

server.listen(port, startServer);
