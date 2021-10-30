const path = require('path');
var dateFormat = require('dateformat');

const buildPathHtml = (name='build') => {
	return path.resolve(`./cerfaList/${name}.html`);
	// return path.resolve(`./01_server/cerfaList/${name}.html`);
}
const buildPathPdf = (name='build') => {
	return path.resolve(`./cerfaList/${name}.pdf`);
	// return path.resolve(`./01_server/cerfaList/${name}.pdf`);
}
const buildPathDir = (string) => {
	let result = '';
	for (index in string) if (index < string.length - 1) result += '/' + string[index]
	return path.resolve(`./cerfaList${result}`);
	// return path.resolve(`./01_server/cerfaList${result}`);
}

const folderStringCreation = (string) => {
	let result = '';
	for (index in string) if (index < string.length - 1) result += '/' + string[index]
	result += '/' + string
	return result
}

module.exports = {buildPathHtml, buildPathPdf, buildPathDir, folderStringCreation}