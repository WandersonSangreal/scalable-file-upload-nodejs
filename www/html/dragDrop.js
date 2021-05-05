const inputFiles = document.getElementById('file');
const dropArea = document.getElementById('drop-area');

const handleDrop = event => {

	const data = event.dataTransfer;

	inputFiles.files = data.files;

	showSize();

};

const preventDefaults = event => {
	event.preventDefault();
	event.stopPropagation();
};

const highlight = e => {
	dropArea.classList.add("border-warning");
};

const unhighlight = e => {
	dropArea.classList.remove("border-warning");
};

["dragenter", "dragover", "dragleave", "drop"].forEach(eventName => {
	dropArea.addEventListener(eventName, preventDefaults, false);
});

["dragenter", "dragover"].forEach(eventName => {
	dropArea.addEventListener(eventName, highlight, false);
});

["dragleave", "drop"].forEach(eventName => {
	dropArea.addEventListener(eventName, unhighlight, false);
});

dropArea.addEventListener("drop", handleDrop, false);
