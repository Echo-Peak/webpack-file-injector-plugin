const path = require('path');


module.exports = function(file ,fileDirectory){
    let self = this;

    let relitivePath = path.resolve(fileDirectory).split(/\\+/g);
    relitivePath.pop();
    let withoutFile = relitivePath.join('\\');


    let newFile = file.replace(this.getOptions().keyword , function(match ,capture , index){
      let parts = capture.split(/,/g);
      let filename = parts[0].trim().replace(/"|'/g ,'');
      let options = {}
      self.getOptions().verboseLogging && self.stdout('log' ,`Found \x1b[33m '${file}' \x1b[0m from \x1b[35m '${withoutFile}'\x1b[0m` ,'lightBlue');

      try{
        options = (parts[1] !== void 0 && parts[1].length) && JSON.parse(parts[1]);
      }catch(e){
        self.stdout('warning' ,`Can not parse options as object at '${fileDirectory}:${index}'` ,'yellow');
      }

      if(!/\.[a-z0-9]+$/.test(filename)){
        self.stdout('error' ,`${filename} is not a file, | ${fileDirectory}:${index}` ,'red')
        return `(null /*Expected file. Got '${filename}' from ${fileDirectory.replace(/\\/g,'/')}:${index}*/)`;
      }

      let injectFile = self.getFile({file:filename , dir:withoutFile} ,options);
      return injectFile

    });

    return newFile.trim()

}
