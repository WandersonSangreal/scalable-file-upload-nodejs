let totalBytes = 0;

const inputFiles = document.getElementById('file');
const message = document.getElementById('messages');
const dropArea = document.getElementById('drop-area');

const formatBytes = (bytes, decimals = 2) => {

	if (bytes === 0)
		return '0 bytes';

	const k = 1024;
	const d = decimals < 0 ? 0 : decimals;
	const m = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
	const i = Math.floor(Math.log(bytes) / Math.log(k));

	return String(parseFloat((bytes / Math.pow(k, i)).toFixed(d)) + ' ' + m[i]);

}

const updateSize = (size) => {

	const el = document.getElementById('size');

	if (el) {
		el.innerHTML = `Pending bytes to upload: <strong>${formatBytes(size)}</strong>`;
	}

}

const showSize = _ => {

	const {files: fileElements} = document.getElementById('file');

	if (!fileElements.length)
		return;

	message.innerText = '';
	dropArea.classList.remove('border-danger');

	const files = Array.from(fileElements);

	const {size} = files.reduce((previousValue, currentValue) => ({size: previousValue.size + currentValue.size}), {size: 0});

	totalBytes = size;

	updateSize(size);

	// debugger

}

const configureAction = targetUrl => {
	const form = document.getElementById('form');
	form.action = targetUrl;
}

const validtionForm = () => {

	const fields = [...document.querySelectorAll('form#form .form-control')].map(({id}) => id);
	const formData = new FormData(document.querySelector('form#form'));
	const values = Object.fromEntries(formData.entries());

	const invalid = fields.some(key => {

		const el = document.getElementById(String(key));
		const verify = !values.hasOwnProperty(String(key)) || (values.hasOwnProperty(String(key)) && !el.validity.valid && !Boolean(values[String(key)])) || !el.validity.valid || (el.validity.valid && el.files.length === 0);

		if (verify) {

			el.focus();

			if (el.files.length === 0) {
				dropArea.classList.add('border-danger');
			}

		}

		return verify;

	});

	if (invalid) {

		message.innerText = 'Choose at least one file to upload';

		return false;
	}

	return true;

}

const sendFiles = () => {

	if (validtionForm()) {

		const form = document.getElementById('form');
		const files = document.getElementById('file').files;

		const formData = new FormData();

		for (let i = 0; i < files.length; i++) {
			formData.append('files', files[i]);
		}

		axios.post(form.action, formData).then(response => {

			console.log(response);

		}).catch(reason => {

			console.log(reason);

		});

	}

}

const onload = _ => {

	const form = document.getElementById('form');

	form.addEventListener('submit', event => {

		event.preventDefault();
		event.stopPropagation();

	}, false);

	const clientNode = io.connect('ws://127.0.0.1:8080', {withCredentials: false});

	clientNode.on('connect', message => {

		console.log('connected', clientNode.id);

		const targetUrl = '/server/?io='.concat(clientNode.id);

		configureAction(targetUrl);

	});

	clientNode.on('uploading-bytes', bytes => {

		totalBytes = totalBytes - bytes;

		updateSize(totalBytes);

	});

	clientNode.on('finish-file', file => {

		message.classList.add('text-success');
		message.innerText = `File [${file}] uploaded successfull!`;

	});

	console.log("loaded");

	dragDrop(dropArea, inputFiles);
}

window.onload = onload;
// window.showSize = showSize;
