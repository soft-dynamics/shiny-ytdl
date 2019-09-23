var http = require('http');
var https = require('https');
var readline = require('readline');
var cmd = require('child_process');
var fs = require('fs');

try {
	var package  = JSON.parse(fs.readFileSync('./package.json'));
} catch (e) {
	console.log("Don't found package.json, downloading the missing file...");
	https.get('https://raw.githubusercontent.com/soft-dynamics/shiny-ytdl/master/package.json', (res) => {
		var data = "";
		res.on('data', (chunk) => {
			data += chunk;
		});
		
		res.on('end', () => {
			fs.writeFileSync('./package.json', data);
			console.log("File downloaded! Restarting the app...");
			cmd.exec('node website.js');
		});
	}).on('error', (err) => {
		console.log("Can't download package.json, please manually download in https://github.com/soft-dynamics/shiny-ytdl.");
		process.exit(1);
	});
}

try {
	var config = require('./config.json');
} catch (e) {
	console.log("Don't found config.json, downloading the missing file...");
	https.get('https://raw.githubusercontent.com/soft-dynamics/shiny-ytdl/master/config.json', (res) => {
		var data = "";
		res.on('data', (chunk) => {
			data += chunk;
		});
		
		res.on('end', () => {
			fs.writeFileSync('./config.json', data);
			console.log("File downloaded! Restarting the app...");
			cmd.exec('node website.js');
		});
	}).on('error', (err) => {
		console.log("Can't download config.json, please manually download in https://github.com/soft-dynamics/shiny-ytdl.");
		process.exit(1);
	});
}

try {
	var express = require('express');
	var contentDisposition = require('content-disposition');
	var ejs = require('ejs');
	var ytpl = require('ytpl');
	var search = require('yt-search');
	var ytdl = require('ytdl-core');
	var ffmpeg = require('fluent-ffmpeg');
} catch (e) {
	console.log("Don't found dependencies, installing all needed dependencies...");
	cmd.exec('npm install', (error, stdout, stderr) => {
		if (error) {
			console.log("A error has happen: "+error);
			process.exit(1);
		}
		if (stderr) {
			console.log("NPM returned a error: "+stderr);
			process.exit(1);
		}
		console.log("Dependencies installed! Restarting the app...");
		cmd.exec('node website.js');
	});
}
