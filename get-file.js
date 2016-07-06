const path = require('path');
const fs = require('fs');

//would check if file is ASCII  but may lead to an unessesary bottle neck when streaming 100+ chunks
module.exports = function(fileObject , options){
    let _path;
    let stream;
    // todo -> aync
      if(options.cwd){
        _path = path.resolve(process.cwd() ,options.cwd, fileObject.file);
      }else{
        _path = path.resolve(fileObject.dir , fileObject.file);
      }
      try{
        stream = fs.readFileSync(_path);

        if(stream === void 0){
          return `(null /*cant find '${fileObject.file}' at '${fileObject.dir.replace(/\\/g,'/')}'*/)`;
        }
        return stream.toString();
      }catch(e){
        this.getOptions().verboseLogging && this.stdout('error',e,'red')
        return `(null /*ERROR no such file '${fileObject.file}' at '${fileObject.dir.replace(/\\/g,'/')}'*/)`;
      }
}
