let totalBytes = 0;

const onload = _ => {
	console.log("loaded");
}

const formatBytes = (bytes, decimals = 2) => {

	if (bytes === 0)
		return '0 bytes';

	const k = 1024;
	const d = decimals < 0 ? 0 : decimals;
	const m = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
	const i = Math.floor(Math.log(bytes) / Math.log(k));

	return parseFloat((bytes / Math.pow(k, i)).toFixed(d) + ' ' + m[i]);

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

	const files = Array.from(fileElements);

	const {size} = files.reduce((previousValue, currentValue) => ({size: previousValue.size + currentValue.size}), {size: 0});

	totalBytes = size;

	updateSize(size);

	// debugger

}

window.onload = onload;
// window.showSize = showSize;
