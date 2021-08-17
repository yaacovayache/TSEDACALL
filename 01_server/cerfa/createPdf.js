const fs = require('fs');
const puppeteer = require('puppeteer');
// Build paths
const buildPaths = require('./buildPaths');
const createHtmlCerfa = require('./createTable');
// const pathPdf = require('./buildPaths');

const printPdf = async (data) => {
	console.log('Starting: Generating PDF Process, Kindly wait ..');
	/** Launch a headleass browser */
	const browser = await puppeteer.launch();
	/* 1- Ccreate a newPage() object. It is created in default browser context. */
	const page = await browser.newPage();
	/* 2- Will open our generated `.html` file in the new Page instance. */
	await page.goto(buildPaths.buildPathHtml(data.campaign._id + '-' + data.donator.fname + '-' + data.donator.lname), { waitUntil: 'networkidle0' });
	/* 3- Take a snapshot of the PDF */
	const pdf = await page.pdf({
		format: 'A4',
		margin: {
			top: '20px',
			right: '20px',
			bottom: '20px',
			left: '20px'
		}
	});
	/* 4- Cleanup: close browser. */
	await browser.close();
	console.log('Ending: Generating PDF Process');
	return pdf;
};

const init = async (data) => {
	try {
		const pdf = await printPdf(data);
		if (!fs.existsSync(buildPaths.buildPathDir())){
			fs.mkdirSync(buildPaths.buildPathDir());
		}
		fs.writeFileSync(buildPaths.buildPathPdf(data.campaign._id + '-' + data.donator.fname + '-' + data.donator.lname), pdf);
		console.log('Successfully created an PDF table');
		return pdf
	} catch (error) {
		console.log('Error generating PDF', error);
	}
};

// createHtmlCerfa()
// init();

module.exports = init;
