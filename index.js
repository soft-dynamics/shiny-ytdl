var http = require('http');
var https = require('https');
var cmd = require('child_process');
var fs = require('fs');
var path = require('path');

packRepair();

function packRepair() {
	try {
		var package  = JSON.parse(fs.readFileSync('./package.json'));
		configRepair();
	} catch (e) {
		console.log("\n\x1b[33mDon't found package.json, downloading the missing file...\x1b[0m");
		download('https://raw.githubusercontent.com/soft-dynamics/shiny-ytdl/master/package.json', (err, data) => {
			if (err) {
				console.log("\n\x1b[31mCan't download package.json, please manually download in https://github.com/soft-dynamics/shiny-ytdl.\x1b[0m");
				process.exit(1);
			}
			fs.writeFileSync('./package.json', data);
			console.log("\n\x1b[34mFile package.json downloaded!\x1b[0m");
			packRepair();
		});
	}
}

function configRepair() {
	try {
		var config = JSON.parse(fs.readFileSync('./config.json'));
		depRepair();
	} catch (e) {
		console.log("\n\x1b[33mDon't found config.json, downloading the missing file...\x1b[0m");
		download('https://raw.githubusercontent.com/soft-dynamics/shiny-ytdl/master/config.json', (err, data) => {
			if (err) {
				console.log("\n\x1b[31mCan't download config.json, please manually download in https://github.com/soft-dynamics/shiny-ytdl.\x1b[0m");
				process.exit(1);
			}
			fs.writeFileSync('./config.json', data);
			console.log("\n\x1b[34mFile config.json downloaded!\x1b[0m");
			packRepair();
		});
	}
}

function depRepair() {
	try {
		var express = require('express');
		var contentDisposition = require('content-disposition');
		var ejs = require('ejs');
		var ytpl = require('ytpl');
		var search = require('yt-search');
		var ytdl = require('ytdl-core');
		var ffmpeg = require('fluent-ffmpeg');
		htmlRepair();
	} catch (e) {
		console.log(e);
		/*console.log("\n\x1b[33mDon't found dependencies, installing all needed dependencies...\x1b[0m");
		cmd.exec('npm install', (error, stdout, stderr) => {
			if (error) {
				console.log("\n\x1b[31mA error has happen: \x1b[0m"+error);
				process.exit(1);
			}
			console.log("\n\x1b[34mDependencies installed!\x1b[0m");
			depRepair();
		});*/
	}
}

function htmlRepair() {
	if (!fs.existsSync("./html")) {
		console.log("\n\x1b[33mDon't found html files, downloading needed files...\x1b[0m");
		fs.mkdirSync("./html");
		
	} else {
		cssRepair();
	}
}

function cssRepair() {
	if (!fs.existsSync('./css')) {
		console.log("\n\x1b[33mDon't found css files, downloading needed files...\x1b[0m");
		fs.mkdirSync("./html");
		
	} else {
		versionVerify();
	}
}

function versionVerify() {
	download('https://raw.githubusercontent.com/soft-dynamics/shiny-ytdl/master/config.json', (err, data) => {
		if (err) {
			console.log("\n\x1b[31mCan't if a new version available.\x1b[0m");
			start();
			return;
		}
		try {
			var config = JSON.parse(fs.readFileSync('./config.json'));
			var newConfig = JSON.parse(data);
			if (newConfig.version.major > config.version.major) {
				console.log("\n\x1b[36mA new major version available! Download she in https://github.com/soft-dynamics/shiny-ytdl.\x1b[0m");
				start();
			} else {
				if (newConfig.version.minor > config.version.minor) {
					console.log("\n\x1b[36mA new minor version available! Download she in https://github.com/soft-dynamics/shiny-ytdl.\x1b[0m");
					start();
				} else {
					if (newConfig.version.patch > config.version.patch) {
						console.log("\n\x1b[36mA new patch version available! Download she in https://github.com/soft-dynamics/shiny-ytdl.\x1b[0m");
						start();
					} else {
						console.log("\n\x1b[33mShiny \x1b[31mY\x1b[37mT\x1b[36mDL \x1b[32mis fully updated!\x1b[0m");
						start();
					}
				}
			}
		} catch (e) {
			console.log("\n\x1b[31mCan't if a new version available.\x1b[0m");
			start();
		}
	});
}

function start() {
	var config = JSON.parse(fs.readFileSync('./config.json'));
	
	var express = require('express');
	var contentDisposition = require('content-disposition');
	var ejs = require('ejs');
	var ytpl = require('ytpl');
	var search = require('yt-search');
	var ytdl = require('ytdl-core');
	var ffmpeg = require('fluent-ffmpeg');
	
	var app = express();
	
	app.use(express.static(__dirname+'/html'));
	app.use(express.static(__dirname+'/css'));
	app.engine('html', ejs.renderFile);
	
	app.get('/', (req, res) => {
		
	});
	
	app.get('/changelog', (req, res) => {
		
	});
	
	app.get('/ytdl', (req, res) => {
		
	});
	
	app.get('/ytpl', (req, res) => {
		
	});
	
	app.post('/ytdl-download', (req, res) => {
		
	});
	
	app.post('/ytpl-download', (req, res) => {
		
	});
	
	if (config.protocol.http.enable === true) {
		if (config.protocol.https.redirect === true && config.protocol.https.enable === true) {
			var red = express();
			red.get('*', (req, res) => {
				var link = req.headers.host.replace(/:[0-9]+/, ":"+config.protocol.https.port);
				res.redirect("https://"+link+req.path);
			});
			http.createServer(red).listen(config.protocol.http.port, () => {
				console.log("\n\x1b[32mRedirect http to https opened in port "+config.protocol.http.port+".\x1b[0m");
			});
		} else {
			http.createServer(app).listen(config.protocol.http.port, () => {
				console.log("\n\x1b[32mOpened a http server in port "+config.protocol.http.port+".\x1b[0m");
			});
		}
	}
	
	if (config.protocol.https.enable === true) {
		var options = {
			key: fs.readFileSync(config.protocol.https.key),
			cert: fs.readFileSync(config.protocol.https.cert)
		};
		
		https.createServer(app, options).listen(config.protocol.https.port, () => {
			console.log("\n\x1b[32mOpened a https server in port "+config.protocol.https.port+".\x1b[0m");
		});
	}
}

function download(url, callback) {
	https.get(url, (res) => {
		var data = "";
		res.on('data', (chunk) => {
			data += chunk;
		});
		res.on('end', () => {
			callback(undefined, data);
		});
	}).on('error', (err) => {
		callback(err, undefined);
	});
}
