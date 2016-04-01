var applyOptions = require('./apply-options');
var options = require('./options');
var regexParser = require('./regex-parser');
var contentBuilder = require('./content-builder');

//available options
/*
{
  enable:<boolean>
  console:{
  enabled:<boolean>,
  color:<red , green , blue , lightBlue , purple ,yellow>
},
regex:{
  startWith:/stuff/,
  safe:true
}
}

//should look like this  -> webpack-inject-loader?{"console":{"enabled":true ,color:'red'}}
*/

module.exports = function(content){
   this.cacheable();
    var array = [];
    var stripComas;
    var regex;
    var query
    var passedOptions;

    if(!this.query ==='' || this.query !== undefined){
       query = this.query.replace(/^\?/,'');
         try{
      var passedOptions = JSON.parse(query);
      if(passedOptions.enable === false){return content}

    }catch(e){
      console.error('\x1b[31m','can not parse query' ,'\x1b[0m');
      return content;
    }
    }
    applyOptions(passedOptions);//set regex console color ..ect
    var Find = regexParser(); //returns the regex use to find file paths

    var foundMatches = content.match(Find);

if(foundMatches === null){
  return content
}

if(foundMatches.length){

    for(var i of foundMatches){
      if(options.regex.safe){
        //ques found matches to be used as big regex down below
        array.push(i.replace('//','/\\/\\'));// formats // correctly for regex constructor
      }else{
        array.push(i) //unsafe...use before a loader that compiles javasript
      }

    }
      stripComas = array.toString().replace(/,/g,'|');//builds the regex
      options.regex.built = stripComas;
      done = contentBuilder(content); //returns the the new content

  return done

}

console.log(done)
}
