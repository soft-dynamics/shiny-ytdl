# Shiny YTDL
A product of [Soft Dynamics](https://softdynamics.tk)

## WIP Alert
This is a develpment project and has various errors and things undone, if you continue are you accepting have errors and various bugs

## Installing
You don't need GIT, you only need the NodeJS, NPM and FFmpeg (With support to mp3, mp4 and ogg) installed in your device

This program is only tested in Android 8.1 and anothers plataform don't has sure it work

This program has a auto install script in your index and he gonna download and install all npm modules or subfiles

### Android

To download in Android you need the [Termux app](https://play.google.com/store/apps/details?id=com.termux) its for free!

To install needed Termux packages use:
- `pkg install ffmpeg libmp3lame libx265 libogg nodejs`

To install Shiny YTDL you gonna create a folder, access she and use:
- `wget -O "index.js" https://raw.githubusercontent.com/soft-dynamics/shiny-ytdl/master/index.js && node index`

To run after installed all:
- `npm start`

Problems with FFmpeg? see https://npmjs.com/package/fluent-ffmpeg

### Windows

To download in Windows you need the following programs:
- [NodeJS](https://nodejs.org/)
- NPM - See NodeJS NPM Windows install
- [FFmpeg](https://ffmpeg.org/)

Install with wget on Windows:
- [wget](http://gnuwin32.sourceforge.net/packages/wget.htm)
1. `wget -O "index.js" https://raw.githubusercontent.com/soft-dynamics/shiny-ytdl/master/index.js`
2. `node index`

Install with git:
1. `git clone https://github.com/soft-dynamics/shiny-ytdl.git`
2. `cd shiny-ytdl`
3. `node index`

To run after installed all:
- `npm start`

Problems with FFmpeg? see https://npmjs.com/package/fluent-ffmpeg

## Changelog
See in [here](https://github.com/soft-dynamics/shiny-ytdl/blob/master/CHANGELOG.md)

## Open Source licensed

This project uses **GPL-v3.0** and you can view in [this link](https://github.com/soft-dynamics/shiny-ytdl/blob/master/LICENSE.txt)

You are able to copy, modify and use but don't create paid or closed source programs and please place in README the credits for Soft Dynamics
