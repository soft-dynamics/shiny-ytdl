var http = require('http');
var https = require('https');
var readline = require('readline');
var cmd = require('child_process');
var fs = require('fs');

try {
	var package  = JSON.parse(fs.readFileSync('./package.json'));
} catch (e) {
	console.log("Don't found package.json, downloading the missing file.");
	https.get('https://raw.githubusercontent.com/soft-dynamics/shiny-ytdl/master/package.json', (res) => {
		var data = "";
		res.on('data', (chunk) => {
			data += chunk;
		});
		
		res.on('end', () => {
			fs.writeFileSync('./package.json', data);
			console.log("File downloaded! Restarting the app");
			cmd.exec('node website.js');
			process.exit(0);
		});
	}).on('error', (err) => {
		console.log("Can't download package.json, please manually download in https://github.com/soft-dynamics/shiny-ytdl");
	});
}

try {
	var config = require('./config.json')
}
