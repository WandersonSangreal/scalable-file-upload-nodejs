const http = require('http');
const ws = require('socket.io');

const port = 3000;

const handler = (request, response) => {

	const main = async (request, response) => response.end('OK');

	return main(request, response);

}

const httpServer = http.createServer(handler);

const io = ws(httpServer, {
	cors: {
		origin: '*',
		credentials: false,
	}
});

io.on('connection', node => {

	console.log('soneone connected', node.id);

});

// io.emit('file-uploaded', 'teste');

const startServer = _ => {

	const {address, port} = httpServer.address();

	console.log(`app running at http://${address}:${port}`);

}

httpServer.listen(port, startServer);
