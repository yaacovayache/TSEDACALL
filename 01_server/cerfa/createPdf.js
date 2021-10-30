const fs = require('fs');
const puppeteer = require('puppeteer');
// Build paths
const buildPaths = require('./buildPaths');


const printPdf = async (data) => {
	console.log('Starting: Generating PDF Process, Kindly wait ..');
	/** Launch a headleass browser */
	const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox'], headless: true});
	/* 1- Ccreate a newPage() object. It is created in default browser context. */
	const page = await browser.newPage();
	/* 2- Will open our generated `.html` file in the new Page instance. */
	await page.goto('file:' + buildPaths.buildPathHtml(buildPaths.folderStringCreation(data.donator.don_id)), { waitUntil: 'networkidle0' });
	const pdf = await page.pdf({
		format: 'A4',
		margin: {
			top: '20px',
			right: '20px',
			bottom: '20px',
			left: '20px'
		}
	});
	await browser.close();
	console.log('Ending: Generating PDF Process');
	return pdf;
};

const init = async (data) => {
	try {
		const pdf = await printPdf(data);
		if (!fs.existsSync(buildPaths.buildPathDir(data.donator.don_id))){
			fs.mkdirSync(buildPaths.buildPathDir(data.donator.don_id),{recursive: true});
		}
		fs.writeFileSync(buildPaths.buildPathPdf(buildPaths.folderStringCreation(data.donator.don_id)), pdf);
		console.log('Successfully created an PDF table');
		return pdf
	} catch (error) {
		console.log('Error generating PDF', error);
	}
};



module.exports = init;
