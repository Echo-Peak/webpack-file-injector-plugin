var options = require('./options');
var FS = require('fs');
var path = require('path');
module.exports = function(content){//regex & content
  var finalContent;

  var resetColor = '\x1b[0m';
  var extractPath;


function readFile(err,data){
   if(err){
       return content;
     }
    return data;
}
if(options.regex.safe){
  extractPath = new RegExp('/\\/\\'+options.regex.startWith);
}else{
  extractPath = new RegExp(options.regex.startWith);
}

  var allRegexFilePaths = new RegExp(options.regex.built,'gmi');
  finalContent = content.replace(allRegexFilePaths,function(filesPaths){
    var filePath = filesPaths.replace(extractPath,'');//removes the delmiter leaving the relative path
    if(options.console.enabled){
      console.log(options.console.color,'[Webpack-inject-loader] found -> ',resetColor,filePath);
    }


      return FS.readFileSync(filePath ,'utf-8',readFile);
    });
    return finalContent;
}
