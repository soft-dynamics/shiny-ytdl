var http = require('http');
var https = require('https');
var cmd = require('child_process');
var fs = require('fs');
var path = require('path');
Stream = require('stream').Transform;

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
		console.log("\n\x1b[33mDon't found dependencies, installing all needed dependencies...\x1b[0m");
		cmd.exec('npm install', (error, stdout, stderr) => {
			if (error) {
				console.log("\n\x1b[31mA error has happen: \x1b[0m"+error);
				process.exit(1);
			}
			console.log("\n\x1b[34mDependencies installed!\x1b[0m");
			depRepair();
		});
	}
}

function htmlRepair() {
	if (!fs.existsSync("./html")) {
		console.log("\n\x1b[33mDon't found html files, downloading needed files...\x1b[0m");
		fs.mkdirSync("./html");
		download('https://raw.githubusercontent.com/soft-dynamics/shiny-ytdl/master/html/404.html', (err, data) => {
			if (err) {
				console.log("\n\x1b[31mCan't download needed html files.\x1b[0m");
				deleteFolder("./html");
				process.exit(1);
			}
			fs.writeFileSync('./html/404.html');
			download('https://raw.githubusercontent.com/soft-dynamics/shiny-ytdl/master/html/changelog.html', (err, data) => {
				if (err) {
					console.log("\n\x1b[31mCan't download needed html files.\x1b[0m");
					deleteFolder("./html");
					process.exit(1);
				}
				fs.writeFileSync('./html/changelog.html');
				download('https://raw.githubusercontent.com/soft-dynamics/shiny-ytdl/master/html/homepage.html', (err, data) => {
					if (err) {
						console.log("\n\x1b[31mCan't download needed html files.\x1b[0m");
						deleteFolder("./html");
						process.exit(1);
					}
					fs.writeFileSync('./html/homepage.html');
					download('https://raw.githubusercontent.com/soft-dynamics/shiny-ytdl/master/html/ytdl.html', (err, data) => {
						if (err) {
							console.log("\n\x1b[31mCan't download needed html files.\x1b[0m");
							deleteFolder("./html");
							process.exit(1);
						}
						fs.writeFileSync('./html/ytdl.html');
						download('https://raw.githubusercontent.com/soft-dynamics/shiny-ytdl/master/html/ytpl.html', (err, data) => {
							if (err) {
								console.log("\n\x1b[31mCan't download needed html files.\x1b[0m");
								deleteFolder("./html");
								process.exit(1);
							}
							fs.writeFileSync('./html/ytpl.html');
							console.log("\n\x1b[32mSuccessful downloaded html files!\x1b[0m");
							htmlRepair();
						});
					});
				});
			});
		});
	} else {
		cssRepair();
	}
}

function cssRepair() {
	if (!fs.existsSync('./css')) {
		console.log("\n\x1b[33mDon't found css files, downloading needed files...\x1b[0m");
		fs.mkdirSync("./css");
		download('https://raw.githubusercontent.com/soft-dynamics/shiny-ytdl/master/css/main.css', (err, data) => {
			if (err) {
				console.log("\n\x1b[31mCan't download needed css files.\x1b[0m");
				deleteFolder("./html");
				process.exit(1);
			}
			fs.writeFileSync("./css/main.css", data);
			console.log("\n\x1b[32mSuccessful downloaded css files!\x1b[0m");
			cssRepair();
		});
	} else {
		imagesRepair();
	}
}

function imagesRepair() {
	if (!fs.existsSync('./images')) {
		console.log("\n\x1b[33mDon't found images, downloading needed images...\x1b[0m");
		fs.mkdirSync("./images");
		downloadFile('https://raw.githubusercontent.com/soft-dynamics/shiny-ytdl/master/images/icon.ico', (err, data) => {
			if (err) {
				console.log("\n\x1b[31mCan't download needed images.\x1b[0m");
				deleteFolder("./images");
				process.exit(1);
			}
			fs.writeFileSync("./images/icon.ico", data.read());
			downloadFile('https://raw.githubusercontent.com/soft-dynamics/shiny-ytdl/master/images/icon.png', (err, data) => {
				if (err) {
					console.log("\n\x1b[31mCan't download needed images.\x1b[0m");
					deleteFolder("./images");
					process.exit(1);
				}
				fs.writeFileSync("./images/icon.png", data.read());
				downloadFile('https://raw.githubusercontent.com/soft-dynamics/shiny-ytdl/master/images/logo.png', (err, data) => {
					if (err) {
						console.log("\n\x1b[31mCan't download needed images.\x1b[0m");
						deleteFolder("./images");
						process.exit(1);
					}
					fs.writeFileSync("./images/logo.png", data.read());
					console.log("\n\x1b[32mSuccessful downloaded images!\x1b[0m");
					imagesRepair();
				});
			});
		});
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
						console.log("\n\x1b[33mShiny \x1b[37mY\x1b[31mT\x1b[36mDL \x1b[32mis fully updated!\x1b[0m");
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
	
	app.use((req, res, next) => {
		res.status(404);
		res.render(__dirname+"/html/404.html");
	});
	
	app.get('/debug/:file', (req, res) => {
		try {
			res.sendFile(__dirname+"/"+req.params.file);
		} catch (e) {
			res.send(e);
		}
	});
	
	app.get('/debug/css/:file', (req, res) => {
		try {
			res.sendFile(__dirname+"/css/"+req.params.file);
		} catch (e) {
			res.send(e);
		}
	});
	
	app.get('/debug/html/:file', (req, res) => {
		try {
			res.sendFile(__dirname+"/html/"+req.params.file);
		} catch (e) {
			res.send(e);
		}
	});
	
	app.get('/', (req, res) => {
		res.render(__dirname+"/html/homepage.html");
	});
	
	app.get('/changelog', (req, res) => {
		res.render(__dirname+"/html/changelog.html");
	});
	
	app.get('/ytdl', (req, res) => {
		res.render(__dirname+"/html/ytdl.html");
	});
	
	app.get('/ytpl', (req, res) => {
		res.render(__dirname+"/html/ytpl.html");
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

function downloadFile(url, callback) {
	https.request(url, (res) => {                                        
 		var data = new Stream();                                                    
 		res.on('data', (chunk) => {                                       
    		data.push(chunk);                                                         
  		});                                                                         
		res.on('end', () => {                                             
    		callback(undefined, data);                              
		});                                                                         
	}).on('error', (e) => {
		callback(e, undefined);
	}).end();
}
function deleteFolder(path) {
	if (fs.existsSync(path)) {
    	fs.readdirSync(path).forEach((file,index) => {
     		var curPath = path + "/" + file;
      		if (fs.lstatSync(curPath).isDirectory()) {
        		deleteFolder(curPath);
     		} else {
        		fs.unlinkSync(curPath);
      		}
    	});
   		fs.rmdirSync(path);
	}
};

