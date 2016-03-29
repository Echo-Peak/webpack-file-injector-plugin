# webpack-inject-loader
Installation
-------------
```
npm install webpack-inject-loader
```
Description
-------------
have a large function that cant be easily modulelize into seprate functions? 
useful if you have hard to reason code that needs to be split up into chunks of code

inject code blocks into file without haveing webpack to put small chuncks of code into functions/modules thus increasing output performance

Usage
-------------
> **in-some-file.js**

```
before

function getRandomHexColor(){
	var hexabet = '0123456789abcdef';
	var hex = '#';
	var hexLength = 6;
	while(hexLength--){
	hex += hexabet[Math.floor(Math.random()*16)];
	//...more code 
}
	
	
return hex
}
```
```
after

function getRandomHexColor(){
	var hexabet = '0123456789abcdef';
	var hex = '#';
	var hexLength = 6;
	//@inject <../some/path/to/file>.js
	
return hex
}
```
