var http = require('http');
var https = require('https');
var cmd = require('child_process');

try {
	var package  = JSON.parse(fs.readFileSync('./package.json'));
} catch (e) {
	
}
