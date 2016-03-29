var FS = require('fs');
module.exports = function(content){
   this.cacheable();
    var delmiterKeys = /\/\/\@inject (..\/)*([a-z0-9- ]+\/)*[a-z0-9- ]+\.[a-z0-9- ]+/gmi;
    var array = [];
    var foundMatches = content.match(delmiterKeys);
    var stripComas;
    var regex;
if(foundMatches === null){
  return content
}

if(foundMatches.length){

     foundMatches.forEach(function(item ,index ,arr){
       array.push(item);//ques found matches to be used as big regex down below
   });

      stripComas = array.toString().replace(/,/g,'|');//builds the regex
      regex = new RegExp(stripComas ,'gmi');

      var done = content.replace(regex,function(filesPaths){

        var filePath = filesPaths.replace(/\/\/\@inject /,'');//removes the delmiter leaving the relative path
          console.log('\x1b[36m','[webpack-snippets] found -> ',filePath ,'\x1b[0m');
          return FS.readFileSync(filePath ,'utf-8',function(err,data){
             if(err){

               return content
             }


              return data
          });
        });
  return done

}


}
