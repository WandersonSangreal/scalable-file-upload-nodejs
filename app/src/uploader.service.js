const Busboy = require('busboy');
const {join} = require('path');
const {createWriteStream} = require('fs');

const {logger, pipelineAsync} = require('./helpers');

const FINISH_EVENT = 'finish-file';
const UPLOADING_EVENT = 'uploading-bytes';

class UploaderService {

	#io
	#id

	constructor(io, id) {
		this.#id = id;
		this.#io = io;
	}

	regiterEvents(headers, onFinish) {

		const busboy = new Busboy({headers});

		busboy.on('file', this.#onFile.bind(this));

		busboy.on('finish', onFinish);

		return busboy;

	}

	#handleFileBytes(filename) {
		async function* handleData(data) {
			for await (const item of data) {
				const size = item.length;
				// logger.info(`file [${filename}] got ${size} bytes to ${this.#id}`);
				this.#io.to(this.#id).emit(UPLOADING_EVENT, size);
				yield item;
			}
		}

		return handleData.bind(this);
	}

	async #onFile(fieldname, file, filename) {

		const savePath = join(__dirname, '../', 'downloads', filename);

		logger.info('uploading: ' + savePath);

		await pipelineAsync(file, this.#handleFileBytes.apply(this, [filename]), createWriteStream(savePath));

		this.#io.to(this.#id).emit(FINISH_EVENT, filename);

		logger.info(`file [${filename}] finished!`);

	}

}

module.exports = UploaderService;
