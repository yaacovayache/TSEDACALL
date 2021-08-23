const path = require('path');
var dateFormat = require('dateformat');

const buildPathHtml = (name='build') => {
	// return path.resolve(`./cerfaList/${dateFormat(new Date(), "yyyy-mm-dd")}/${name}.html`);
	return path.resolve(`./01_server/cerfaList/${dateFormat(new Date(), "yyyy-mm-dd")}/${name}.html`);
}
const buildPathPdf = (name='build') => {
	// return path.resolve(`./cerfaList/${dateFormat(new Date(), "yyyy-mm-dd")}/${name}.pdf`);
	return path.resolve(`./01_server/cerfaList/${dateFormat(new Date(), "yyyy-mm-dd")}/${name}.pdf`);
}
const buildPathDir = () => {
	// return path.resolve(`./cerfaList/${dateFormat(new Date(), "yyyy-mm-dd")}`);
	return path.resolve(`./01_server/cerfaList/${dateFormat(new Date(), "yyyy-mm-dd")}`);
}

module.exports = {buildPathHtml, buildPathPdf, buildPathDir}