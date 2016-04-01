var options = require('./options');
module.exports = function(queryOptions){
  var q = queryOptions //shorthand
  if(q === '' || q == undefined){
    options.console.enabled = true;
    options.regex.startWith ='@mally';
    options.console.color = options.console.colors.set('red')
    options.regex.safe = true;
}else{

  if(q.console.enabled){
    options.console.enabled = true
  }else{
    options.console.enabled = false
  }

  for(var x of options.console.colors.keys){
    if(q.console.color === x){
      options.console.color = options.console.colors.colorSet[x];

    }
  }

  if(typeof q.regex.startWith === 'string' && q.regex.startWith.length){
    options.regex.startWith = q.regex.startWith
  }
  if(q.regex.safe === false){
    options.regex.safe = false;

  }
}

}
