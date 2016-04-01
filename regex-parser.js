var options = require('./options');
module.exports = function(){
  var o = options; //shorthand
var fullRegex;
var startWith = o.regex.startWith;
var safe = '/\\/\\';// -> //
var built =[];
if(o.regex.safe === false){
  /*
    removes // from begining of regex
    could be usefull before a loader that compiles the code
    otherwise it will be a syntax error and fail compilation
  */
  safe = '';
}
var path = '(..\/)*([a-z0-9- ]+\/)*[a-z0-9- ]+\.[a-z0-9- ]+';

  fullRegex = new RegExp(safe + startWith + path ,'gmi');
  return fullRegex
}
