**webpack-file-injector-plugin** is a simple plugin that allows you to insert the raw contents of a file into a chunk/module at the place of a keyword

useful if you need to inject html or large strings ,blobs ,...ect into a sting or somewhere where needed

also useful if you have pieces of logic that cant be easily modularize and you could just chain a bunch of files that includes that logic instead



### webpack-file-injector-plugin
Installation

```
npm install webpack-file-injector-plugin
```

## API
#### InjectFile

`.options(Object)`

**Object.keyword**

Type: String

Default : InjectFile

Used in finding each instance of `keyword` in each chunk


**Object.verboseLogging**

Type: Boolean

Default : False

Logs when the plugin finds each instance of `keyword` and where it was found

**Object.beep**

Type: Boolean

Default : False

Outputs a auditory beep to console if a error occurred

---
`.plugin`

Stand alone function , take no paramerters used in webpack.config plugins array

---



## Usage
afile.js
```
const baz = InjectFile('baz-obj.js');
const html = `
	InjectFile('body.html')
	InjectFile('footer.html')
	InjectFile('everything-else.html')
`

```
`keyword` InjectFile should be treated as a function that takes must take one parameter and a optional json object

By default it look for  `baz-obj.js` in the same direcory where the `keyword` is found

you can change this by adding the 2 parameter
```
const baz = InjectFile('baz-obj.js' ,{"cwd":"./compiled"})
```
now it will look at the `Root directory` of the webpack process + `./compiled`;

---
**webpack-file-injector-plugin** allow emits a `transform` event after injecting the contents of a file into each chunk that you can listen to.

webpack.conf.js
```
let InjectFile = require('webpack-file-injector-plugin');

InjectFile.options({keyword:'IncludeFile' ,beep:false , verboseLogging:true});

InjectFile.on('transform' ,function(file, filePath , callback){
//use callback to transmute file and send it the compiler
let newFile = file.replace(/[a-k]/gmi, 'stuff')

callback(newFile)
})

module.exports = {
	entry:'somepath/somefile.js',
	plugins:[
	InjectFile.plugin
	]



}
```
